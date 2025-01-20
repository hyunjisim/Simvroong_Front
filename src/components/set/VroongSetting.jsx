import React, { useState } from "react";
import styles from "./VroongSetting.module.css";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";

const VroongSetting = () => {
  const navigate = useNavigate();
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  const [isNotificationOn2, setIsNotificationOn2] = useState(true);
  const [showAlert, setShowAlert] = useState(false); // Alert 상태 추가

  // 뒤로가기 버튼
  const goBack = () => navigate("/profile");

  // 토큰 가져오기
  const getAuthToken = () => sessionStorage.getItem("authToken");

  // 서버에 진동 상태 저장
  const saveVibrationStateToServer = async (isOn) => {
    const token = getAuthToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://192.168.163.8:8080/settings/vibration", {
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
    sessionStorage.removeItem("authToken"); // 토큰 삭제
    alert("로그아웃되었습니다.");
    navigate("/login"); // 로그인 페이지로 이동
  };

  // 탈퇴하기 기능
  const handleWithdrawal = async () => {
    const token = getAuthToken();
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    try {
      // 백엔드에 탈퇴하기 경로랑 맞게 나중에 고치기!
      const response = await fetch("http://192.168.163.8:8080/user/withdraw", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("탈퇴 처리 실패");
      }

      alert("탈퇴가 완료되었습니다.");
      sessionStorage.removeItem("authToken"); // 토큰 삭제
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("탈퇴 실패:", error);
      alert("탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // Alert 창 열기/닫기
  const openAlert = () => setShowAlert(true);
  const closeAlert = () => setShowAlert(false);

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
            <div className={styles.settingTitle_detail}>해주세요 알림음</div>
            <p className={styles.settingDescription}>
              OFF시 휴대폰 기본 알림음이 적용돼요
            </p>
          </div>
          {/* 토글버튼 */}
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
          앱진동
          {/* 토글버튼 */}
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
        <div className={styles.settingLogout} onClick={handleLogout}>로그아웃</div>

        {/* 탈퇴하기 */}
        <div className={styles.settingWithdraw} onClick={openAlert}>탈퇴하기</div>
      </div>

      {/* 탈퇴 경고창 */}
      {showAlert && (
        <div className={styles.alertoutHeader}>
          <div className={styles.alertoutContainer}>
            <h3 className={styles.alertoutTitle}>정말 탈퇴할까요?</h3>
            <ul className={styles.alertoutList}>
              <li className={styles.alertout1}>탈퇴 시 모든 정보는 삭제돼요.</li>
              <li className={styles.alertout2}>탈퇴 후 재가입은 30일 뒤에 가능해요.</li>
              <li className={styles.alertout3}>수익금 또는 충전금이 있으면 탈퇴할 수 없어요.</li>
            </ul>
            <div className={styles.alertoutButtons}>
              <button className={styles.confirmButton} onClick={handleWithdrawal}>탈퇴하기</button>
              <button className={styles.cancelButton} onClick={closeAlert}>아니요</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VroongSetting;
