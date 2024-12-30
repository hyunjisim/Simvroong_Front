import React, { useState } from "react";
import styles from "./VroongSetting.module.css";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";

const VroongSetting = () => {
  const navigate = useNavigate();
  const [isNotificationOn, setIsNotificationOn] = useState(true); // 알림 상태
  const [isNotificationOn2, setIsNotificationOn2] = useState(true); // 진동 상태

  // 뒤로가기 버튼
  const goBack = () => navigate("/profile");

  // 토큰 가져오기
  const getAuthToken = () => localStorage.getItem("authToken");

  // 서버에 진동 상태 저장
  const saveVibrationStateToServer = async (isOn) => {
    const token = getAuthToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8080/settings/vibration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isVibrationOn: isOn }),
      });

      if (!response.ok) {
        throw new Error("서버와 통신 중 오류가 발생했습니다.");
      }

      alert("진동 설정이 저장되었습니다.");
    } catch (error) {
      console.error("진동 상태 저장 실패:", error);
      alert("진동 상태 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 진동 토글 버튼 클릭
  const toggleNotification2 = async () => {
    const newState = !isNotificationOn2;
    setIsNotificationOn2(newState);

    // 진동 실행 (클라이언트)
    if (newState && navigator.vibrate) {
      navigator.vibrate(200); // 200ms 진동
    } else if (!newState) {
      navigator.vibrate(0); // 진동 중지
    }

    // 서버에 상태 저장
    await saveVibrationStateToServer(newState);
  };

  // 로그아웃 기능
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // 토큰 삭제
    alert("로그아웃되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 탈퇴하기 기능
  const handleWithdrawal = () => {
    if (window.confirm("정말로 '심부릉'을 탈퇴하시겠습니까?")) {
      const token = getAuthToken();
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/login");
        return;
      }

      fetch("http://127.0.0.1:8080/user/withdraw", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          alert("탈퇴가 완료되었습니다.");
          localStorage.removeItem("authToken"); // 토큰 삭제
          navigate("/login"); // 로그인 페이지로 이동
        })
        .catch((error) => {
          console.error("탈퇴 실패:", error);
          alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
        });
    }
  };

  return (
    <div className={styles.VroongSettingContainer}>
      {/* 헤더 */}
      <div className={styles.VroongSettingHeader}>
        <img
          onClick={goBack}
          src={backb}
          className={styles.backButton}
          alt="뒤로가기 버튼"
        />
        <h2 className={styles.VroongSettingTitle}>설정</h2>
      </div>

      {/* 설정 리스트 */}
      <div className={styles.VroongSettingList}>
        {/* 알림음 설정 */}
        <div className={styles.settingItem1}>
          <div className={styles.settingTextContainer}>
            <div className={styles.settingTitle}>알림</div>
            <p className={styles.settingDescription}>
              OFF시 휴대폰 기본 알림음이 적용돼요
            </p>
          </div>
          <button
            className={`${styles.toggleButton} ${
              isNotificationOn ? styles.toggleOn : styles.toggleOff
            }`}
            onClick={() => setIsNotificationOn(!isNotificationOn)}
          >
            {isNotificationOn ? "ON" : "OFF"}
          </button>
        </div>

        {/* 앱 진동 */}
        <div className={styles.settingItem2}>
          <div className={styles.settingTitle}>앱 진동</div>
          <button
            className={`${styles.toggleButton} ${
              isNotificationOn2 ? styles.toggleOn : styles.toggleOff
            }`}
            onClick={toggleNotification2}
          >
            {isNotificationOn2 ? "ON" : "OFF"}
          </button>
        </div>

        {/* 로그아웃 */}
        <div className={styles.settingLogout} onClick={handleLogout}>
          로그아웃
        </div>

        {/* 탈퇴하기 */}
        <div className={styles.settingWithdraw} onClick={handleWithdrawal}>
          탈퇴하기
        </div>
      </div>
    </div>
  );
};

export default VroongSetting;
