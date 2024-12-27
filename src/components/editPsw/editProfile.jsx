import React, { useState , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./editProfile.module.css";
import backb from "../../img/back-arrow.png";
import pencil from "../../img/pencil.png";
import defaultProfileImage from "../../img/panda.png"; // 기본 프로필 이미지
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(defaultProfileImage); // 프로필 이미지
  const [nickname, setNickname] = useState("유딩규"); // 사용자 별명
  const [isEditingNickname, setIsEditingNickname] = useState(false); // 닉네임 수정 상태
  const [phoneFirst, setPhoneFirst] = useState("");
  const [phoneRest, setPhoneRest] = useState("");
  const [verifyCode, setVerifyCode] = useState(""); // 인증번호 입력 필드
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 요청 상태
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 인증 성공 상태
  const [isPhoneUpdated, setIsPhoneUpdated] = useState(false); // 전화번호 변경 여부
  const [isPasswordChanged, setIsPasswordChanged] = useState(false); // 비밀번호 변경 여부
  const [isImageChanged, setIsImageChanged] = useState(false); // 이미지 변경 여부
  const [isNicknameChanged, setIsNicknameChanged] = useState(false); // 닉네임 변경 여부
  const [newPassword, setNewPassword] = useState("") // 새 비밀번호

  // 프로필 이미지 변경 핸들러
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
        setIsImageChanged(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // 닉네임 수정 모드 전환
  const toggleNicknameEdit = () => {
    setIsEditingNickname((prev) => !prev);
  };

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChanged(true);
  };

  // 인증번호 요청
  const requestVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}-${phoneRest}`;
    if (!phoneFirst || !phoneRest) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8080/auth/send-code", { phoneNumber });
      alert("인증번호가 발송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      console.error("인증번호 발송 실패:", error);
      alert("인증번호 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 인증번호 확인
  const confirmVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}-${phoneRest}`;
    if (!verifyCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/verify-code", {
        phoneNumber,
        code: verifyCode,
      });
      if (response.data.success) {
        alert("인증이 완료되었습니다.");
        setIsCodeVerified(true);
        setIsPhoneUpdated(true); // 인증 성공 시 전화번호 변경 상태 업데이트
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증번호 확인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 비밀번호 변경 페이지 이동
  const handlePasswordChange = () => {
    navigate("/changePsw", {
      state: { fromEditProfile: true },
    });
    setIsPasswordChanged(true);
  };

  // 저장하기 버튼 핸들러
  const handleSave = async () => {
    try {
      // 변경된 값만 서버로 전송
      const payload = {};

      if (isImageChanged) payload.profileImage = profileImage;
      if (isNicknameChanged) payload.nickname = nickname;
      if (isPhoneUpdated && isCodeVerified) payload.phoneNumber = `${phoneFirst}${phoneRest}`;
      if (isPasswordChanged) payload.newPassword = newPassword; // 비밀번호 포함

      const response = await axios.post("http://127.0.0.1:8080/profile/save", payload);

      if (response.data.success) {
        alert("프로필 정보가 저장되었습니다.");
        navigate("/profile");
      }
    } catch (error) {
      alert("저장 실패. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.container}>
          {/* 헤더 */}
        <div className={styles.header}>
        <img
            src={backb}
            alt="뒤로가기"
            className={styles.backIcon}
            onClick={() => navigate("/personalInfo")}/>
        </div>
    
          {/* 프로필 이미지 및 별명 */}
        <div className={styles.profile}>
            <div className={styles.profileImageContainer}>
            <img src={profileImage} alt="유저 이미지" className={styles.profileImage} />
            <label htmlFor="profileImageInput" className={styles.pencilButton}>
                <img src={pencil} alt="프로필 변경" />
            </label>
            <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                className={styles.imageUpload}
                onChange={handleProfileImageChange}/>
            </div>
            <div className={styles.nicknameContainer}>
            {isEditingNickname ? (
                <input
                className={styles.nicknameInput}
                value={nickname}
                onChange={handleNicknameChange}
                placeholder="별명을 입력하세요"
                onBlur={toggleNicknameEdit}/>
            ) : (
                <>
                <span className={styles.nickname}>{nickname}</span>
                <img
                src={pencil}
                alt="닉네임 변경"
                className={styles.pencilButtonNickname}
                onClick={toggleNicknameEdit}/>
                </>
            )}
            </div>
        </div>
    
          {/* 아이디 */}
        <div className={styles.formGroup1}>
            <label className={styles.labelid}>아이디</label>
            <input className={styles.input} value="apple0000" disabled />
        </div>
    
          {/* 전화번호 변경 */}
        <div className={styles.formGroup2}>
            <label className={styles.labelphone}>전화번호 변경</label>
            <div className={styles.phoneContainer}>
            <select
                className={styles.phoneFirst}
                value={phoneFirst}
                onChange={(e) => setPhoneFirst(e.target.value)}
                disabled={isCodeVerified} // 인증 완료 시 비활성화
            >
                <option value="">앞자리 선택</option>
                <option value="010">010</option>
                <option value="011">011</option>
            </select>
            <span className={styles.dash}>-</span>
            <input
                className={styles.phoneRest}
                type="text"
                maxLength={8}
                placeholder="8자리 입력"
                value={phoneRest}
                onChange={(e) => setPhoneRest(e.target.value)}
                disabled={isCodeVerified} // 인증 완료 시 비활성화
            />
            </div>
            <button
                className={styles.changeButton_1}
                onClick={requestVerificationCode}
                disabled={isCodeVerified} // 인증 완료후 버튼 비활성화
            >
                {isCodeSent ? "인증번호 확인" : "인증번호 받기"}
            </button>
            </div>
    
          {/* 인증번호 입력 */}
            {isCodeSent && (
            <div className={styles.formGroup}>
            <label className={styles.label}>인증번호</label>
            <div className={styles.verifyContainer}>
                <input
                className={styles.input}
                placeholder="인증번호를 입력하세요"
                value={verifyCode}
                onChange={(e) => setVerifyCode(e.target.value)}/>
                <button className={styles.verifyButton} onClick={confirmVerificationCode}>
                인증번호 확인
                </button>
            </div>
            </div>
        )}
    
          {/* 인증 완료 메시지 */}
            {isCodeVerified && (
            <p className={styles.successMessage}>전화번호가 성공적으로 변경되었습니다.</p>
        )}
    
          {/* 비밀번호 변경 */}
        <div className={styles.formGroup3}>
            <label className={styles.labelpw}>비밀번호 변경</label>
            <button className={styles.changeButton} onClick={handlePasswordChange}>
            비밀번호 변경
            </button>
            {isPasswordChanged && <p className={styles.successMessage}>변경 완료되었습니다!</p>}
        </div>
    
          {/* 저장하기 버튼 */}
        <div className={styles.saveContainer}>
            <button className={styles.saveButton} onClick={handleSave}>
            저장하기
            </button>
        </div>
    </div>
    );
    };
    
    export default EditProfile;
    