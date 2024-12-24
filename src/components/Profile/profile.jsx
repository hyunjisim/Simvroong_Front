import React, { useState, useEffect } from "react";
import panda from "../../img/panda.png"; // 프로필 이미지를 임포트
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";
import styles from "./profile.module.css";
import nextarrow from "../../img/nextarrow.png";

const Profile = () => {
  const navigate = useNavigate();
  const [partnerStatus, setPartnerStatus] = useState("지원하기"); // 파트너 상태 관리
  const [vroongMoney, setVroongMoney] = useState(0); // 부릉머니 잔액

  // 파트너 상태 업데이트 (예: 서버 요청으로 상태 가져오기)
  useEffect(() => {
    // 예시로 하드코딩된 데이터 사용
    const fetchPartnerStatus = async () => { 
      // 서버 요청을 통해 상태를 가져올 수 있음
      const status = "지원중"; // 예: "지원중" 또는 "승인됨"
      const money = 50000; // 부릉머니 잔액

      setPartnerStatus(status);
      setVroongMoney(money);
    };

    fetchPartnerStatus();
  }, []);

  const main = () => navigate("/main");
  const vroonglist = () => navigate("/vroonglist");
  const chat = () => navigate("/chat");
  const profile = () => navigate("/profile");
  const goPartnership = () => navigate("/partnership"); // 파트너 지원하기 페이지로 이동
  const goVroongMoney = () => navigate("/vroongmoney"); // 부릉머니 페이지로 이동

  const menuItems = [
    { icon: "📢", text: "공지사항", navigateTo: "/announcement" },
    { icon: "❤️", text: "찜 목록", navigateTo: "/jjimvroong" },
    { icon: "❓", text: "자주 하는 질문", navigateTo: "/question" },
    { icon: "⚙️", text: "설정", navigateTo: "/set" },
    { icon: "👤", text: "회원 정보 조회 및 수정", navigateTo: "/personalInfo" },
    { icon: "📜", text: "약관 및 정책", navigateTo: "/terms" },
  ];

  return (
    <div className={styles.profilecontainer}>
      {/* 프로필 카드 */}
      <div className={styles.profilecard}>
        <div className={styles.profileinfo}>
          <img
            src={panda} // 프로필 이미지 URL
            alt="프로필"
            className={styles.profileimage}
          />
          <span className={styles.profilename}>유딩뀨</span>
          {partnerStatus === "지원중" && (
            <span className={styles.partnerstatus}>파트너 지원중</span>
          )}
          <img
            src={nextarrow}
            className={styles.nextarrow}
            alt="화살표 버튼"
          />
        </div>
        {partnerStatus === "승인됨" ? (
          <div
            className={styles.moneysection}
            onClick={goVroongMoney} // 클릭 시 부릉머니 페이지로 이동
          >
            <div className={styles.moneycontainer}>
              <span className={styles.moneytitle}>부릉머니</span>
              <span className={styles.moneyamount}>{vroongMoney.toLocaleString()}원</span>
            </div>
            <span className={styles.moneydot}></span>
          </div>
        ) : (
          <div
            className={styles.moneysection}
            onClick={goPartnership} // 클릭 시 파트너 지원하기 페이지로 이동
          >
            <div className={styles.moneycontainer}>
              <span className={styles.moneytitle}>파트너 {partnerStatus}</span>
            </div>
            <span className={styles.moneydot}></span>
          </div>
        )}
      </div>

      {/* 메뉴 리스트 */}
      <ul className={styles.menulist}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={styles.menuitem}
            onClick={() => navigate(item.navigateTo)}
          >
            <span className={styles.menuicon}>{item.icon}</span>
            <span className={styles.menutext}>{item.text}</span>
            <img
              src={nextarrow}
              className={styles.nextarrow}
              alt="화살표 버튼"
            />
          </li>
        ))}
      </ul>

      {/* 푸터 */}
      <footer className={styles.mainfooter}>
        <button onClick={main}>
          <img src={Home_none} alt="홈" />
          <span>홈</span>
        </button>
        <button onClick={vroonglist}>
          <img src={Details_none} alt="이용내역" />
          <span>이용내역</span>
        </button>
        <button onClick={chat}>
          <img src={Chat_none} alt="채팅" />
          <span>채팅</span>
        </button>
        <button onClick={profile}>
          <img src={Profile_none} alt="내 정보" />
          <span>내 정보</span>
        </button>
      </footer>
    </div>
  );
};

export default Profile;
