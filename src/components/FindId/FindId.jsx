import React, { useState } from "react";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";
import styles from "./FindId.module.css";
import axios from "axios";

const FindId = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneFirst, setPhoneFirst] = useState("");
  const [phoneRest, setPhoneRest] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [foundId, setFoundId] = useState(null);
  const [registrationDate, setRegistrationDate] = useState("");

  // 뒤로 가기 버튼
  const goBack = () => navigate("/login");
  const goLogin = () => navigate("/login");
  const goFindpw = () => navigate("/Findpw");

  // 인증번호 요청
  const requestVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}${phoneRest}`;
    if (!phoneFirst || !phoneRest) {
      alert("휴대폰 번호를 입력해주세요.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8080/auth/sendCode", { phoneNumber });
      alert("인증번호가 발송되었습니다.");
      setIsCodeSent(true);
    } catch (error) {
      console.error("인증번호 요청 실패:", error);
      alert("인증번호 발송에 실패했습니다.");
    }
  };

  // 인증번호 확인
  const confirmVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}${phoneRest}`;
    if (!verificationCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8080/auth/verifyCode", {
        phoneNumber,
        code: verificationCode,
      });
      alert("인증이 완료되었습니다.");
      setIsCodeVerified(true);
    } catch (error) {
      console.error("인증 실패:", error);
      alert("인증번호가 올바르지 않습니다.");
    }
  };

  // 아이디 찾기 요청
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isCodeVerified) {
      alert("휴대폰 인증을 완료해주세요.");
      return;
    }

    const data = {
      name,
      phoneNumber: `${phoneFirst}${phoneRest}`,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8080/auth/find-id", data);
      if (response.status === 200) {
        const result = response.data;
        setFoundId(result.userId);
        setRegistrationDate(result.registrationDate);
        alert("아이디를 성공적으로 찾았습니다.");
      } else {
        alert("입력한 정보와 일치하는 아이디가 없습니다.");
      }
    } catch (error) {
      console.error("아이디 찾기 실패:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <form className={styles.findidform} onSubmit={handleSubmit}>
      <div className={styles.findidheader}>
        <img onClick={goBack} src={backb} className={styles.backb} alt="뒤로가기 버튼" />
        <h2 className={styles.headeralrimh}>아이디 찾기</h2>
      </div>

      {/* 이름 */}
      <div className={styles.formel}>
        <label htmlFor="name">이름*</label>
        <input
          type="text"
          id="name"
          placeholder="이름을 입력하세요"
          maxLength={30}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* 휴대폰 인증 */}
      <div className={styles.phonenumber}>
        <label htmlFor="phonenum">휴대폰 인증*</label>
        <div>
          <select
            className={styles.phonefirst}
            value={phoneFirst}
            onChange={(e) => setPhoneFirst(e.target.value)}
          >
            <option value="">앞자리 선택</option>
            <option value="010">010</option>
            <option value="011">011</option>
          </select>
          <span className={styles.dash}>-</span>
          <input
            type="text"
            placeholder="8자리 입력"
            maxLength={8}
            value={phoneRest}
            onChange={(e) => setPhoneRest(e.target.value.replace(/[^0-9]/g, ""))}
          />
        </div>
      </div>

      {/* 인증번호 입력 및 버튼 */}
      <div className={styles.verifynum}>
        <input
          type="text"
          placeholder="인증번호를 입력하세요"
          maxLength={10}
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value.replace(/[^0-9]/g, ""))}
        />
        {!isCodeSent ? (
          <button type="button" onClick={requestVerificationCode} className={styles.verifybutton}>
            인증번호 받기
          </button>
        ) : (
          <button type="button" onClick={confirmVerificationCode} className={styles.verifybutton}>
            인증번호 확인
          </button>
        )}
      </div>

      {/* 아이디 찾기 */}
      <div className={styles.findidbutton}>
        <button type="submit" className={styles.findidb}>
          아이디 찾기
        </button>
      </div>

      {/* 아이디 찾기 성공 시 결과 표시 */}
      {foundId && (
        <div className={styles.findidlogall}>
          <div className={styles.findidlog}>
            <p>휴대전화번호 정보와 일치하는 아이디입니다.</p>
            <p>아이디: {foundId}</p>
            <p>가입일: {registrationDate}</p>
          </div>
        </div>
      )}

      {/* 로그인 및 비밀번호 찾기 버튼 */}
      <div className={styles.buttonContainer}>
        <button onClick={goLogin} type="button" className={styles.loginbutt}>
          로그인
        </button>
        <button onClick={goFindpw} type="button" className={styles.pwsearchbutt1}>
          비밀번호 찾기
        </button>
      </div>
    </form>
  );
};

export default FindId;
