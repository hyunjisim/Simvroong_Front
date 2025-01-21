import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './editProfile.module.css';
import backb from '../../img/back-arrow.png';
import pencil from '../../img/pencil.png';
import axios from 'axios';

const HOST_PORT = 'http://127.0.0.1:8080/';

const EditProfile = () => {
  const navigate = useNavigate();

  const [nickname, setNickname] = useState('유딩규');
  const [isEditingNickname, setIsEditingNickname] = useState(false);
  const [phoneFirst, setPhoneFirst] = useState('');
  const [phoneRest, setPhoneRest] = useState('');
  const [verifyCode, setVerifyCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isPhoneUpdated, setIsPhoneUpdated] = useState(false);
  const [isImageChanged, setIsImageChanged] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [profileImage, setProfileImage] = useState(
    'https://res.cloudinary.com/dxvt4iugh/image/upload/v1735498268/aa_qwvdo9.png'
  );
  const [errorMessage, setErrorMessage] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.state?.newPassword) {
      setNewPassword(location.state.newPassword);
      setIsPasswordChanged(true);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
          setErrorMessage('로그인이 필요합니다.');
          return;
        }

        const response = await axios.get(`${HOST_PORT}profile/getNickname`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response) {
          setNickname(response.data.nickname);
          setProfileImage(response.data.photoUrl);
        } else {
          setErrorMessage('닉네임을 불러오지 못했습니다.');
        }
      } catch (error) {
        console.error('닉네임 불러오기 오류:', error);
        setErrorMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      }
    };

    fetchNickname();
  }, []);

  const handleProfileImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setIsImageChanged(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const token = sessionStorage.getItem('authToken');
        const response = await fetch(`${HOST_PORT}profile/upload`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('S3 업로드 실패');
        }

        const data = await response.json();
        console.log('S3 Uploaded URL:', data.imageUrl);

        setProfileImage(data.imageUrl);
      } catch (error) {
        console.error('S3 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  const toggleNicknameEdit = () => {
    setIsEditingNickname((prev) => !prev);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
    setIsNicknameChanged(true);
  };

  const requestVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}${phoneRest}`;
    if (!phoneFirst || !phoneRest) {
      alert('휴대폰 번호를 입력해주세요.');
      return;
    }

    try {
      await axios.post(`${HOST_PORT}auth/sendCode`, { phoneNumber });
      alert('인증번호가 발송되었습니다.');
      setIsCodeSent(true);
    } catch (error) {
      console.error('인증번호 발송 실패:', error);
      alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const confirmVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}${phoneRest}`;
    if (!verifyCode) {
      alert('인증번호를 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${HOST_PORT}auth/verifyCode`, {
        phoneNumber,
        code: verifyCode,
      });
      if (response.data.success) {
        alert('인증이 완료되었습니다.');
        setIsPhoneUpdated(true);
        setIsCodeVerified(true);
      } else {
        alert('인증번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('인증 실패:', error);
      alert('인증번호 확인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handlePasswordChange = () => {
    navigate('/changePsw', {
      state: { fromEditProfile: true },
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const data = {
        nickname,
        phoneNumber: `${phoneFirst}${phoneRest}`,
      };

      const token = sessionStorage.getItem('authToken');

      const response = await axios.put(`${HOST_PORT}profile/userInfo/modifyInfo`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        alert('프로필 정보가 저장되었습니다.');
        navigate('/profile');
      }
    } catch (error) {
      alert('저장 실패. 다시 시도해주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={backb}
          alt="뒤로가기"
          className={styles.backIcon}
          onClick={() => navigate('/personalInfo')}
        />
      </div>
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <div className={styles.profile}>
        <div className={styles.profileImageContainer}>
          <img
            src={profileImage}
            alt="유저 이미지"
            className={styles.profileImage}
          />
          <label htmlFor="profileImageInput" className={styles.changeImageLabel}>
            이미지 변경하기
          </label>
          <input
            type="file"
            id="profileImageInput"
            accept="image/*"
            className={styles.imageUpload}
            onChange={handleProfileImageChange}
          />
        </div>
        <div className={styles.nicknameContainer}>
          {isEditingNickname ? (
            <input
              className={styles.nicknameInput}
              value={nickname}
              onChange={handleNicknameChange}
              placeholder="별명을 입력하세요"
              onBlur={toggleNicknameEdit}
            />
          ) : (
            <>
              <span className={styles.nickname}>{nickname}</span>
              <img
                src={pencil}
                alt="닉네임 변경"
                className={styles.pencilButtonNickname}
                onClick={toggleNicknameEdit}
              />
            </>
          )}
        </div>
      </div>
      <div className={styles.formGroup1}>
        <label className={styles.labelid}>아이디</label>
        <input className={styles.input} value="apple0000" disabled />
      </div>
      <div className={styles.formGroup2}>
        <label className={styles.labelphone}>전화번호 변경</label>
        <div className={styles.phoneContainer}>
          <select
            className={styles.phoneFirst}
            value={phoneFirst}
            onChange={(e) => setPhoneFirst(e.target.value)}
            disabled={isCodeVerified}
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
            disabled={isCodeVerified}
          />
        </div>
        <button
          className={styles.changeButton_1}
          onClick={requestVerificationCode}
          disabled={isCodeVerified}
        >
          {isCodeSent ? '인증번호 확인' : '인증번호 받기'}
        </button>
      </div>
      {isCodeSent && !isCodeVerified && (
        <div className={styles.formGroup3}>
          <label className={styles.labelphone}>인증번호</label>
          <input
            className={styles.input}
            type="text"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            placeholder="인증번호 입력"
          />
          <button className={styles.confirmButton} onClick={confirmVerificationCode}>
            확인
          </button>
        </div>
      )}
      <div className={styles.formGroup}>
        <label className={styles.label}>비밀번호 변경</label>
        <button className={styles.changeButton} onClick={handlePasswordChange}>
          비밀번호 변경
        </button>
        {isPasswordChanged && <p className={styles.successMessage}>변경 완료되었습니다!</p>}
      </div>
      <button className={styles.saveButton} onClick={handleSave}>
        저장하기
      </button>
    </div>
  );
};

export default EditProfile;
