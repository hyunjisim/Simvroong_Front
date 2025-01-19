import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";
import styles from "./profile.module.css";
import nextarrow from "../../img/nextarrow.png";

const Profile = () => {
  const navigate = useNavigate();
  const [partnerStatus, setPartnerStatus] = useState("지원하기");
  const [nickname, setNickname] = useState("닉네임 없음");
  const [photoUrl, setPhotoUrl] = useState(""); // 사진 URL 상태 추가
  const [vroongMoney, setVroongMoney] = useState(0);

  // 파트너 상태 가져오기
  useEffect(() => {
    const fetchPartnerStatus = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/partnership/getpartner", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("백엔드 응답 partnerStatus:", response.data.partnerStatus);

        setPartnerStatus(response.data.partnerStatus || "지원하기");
        setVroongMoney(response.data?.vroongMoney || 0);
      } catch (error) {
        console.error("파트너 상태 데이터 로드 실패:", error);
        setPartnerStatus("지원하기");
        setVroongMoney(0);
      }
    };

    const fetchNickname = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const response = await axios.get("http://localhost:8080/profile/getNickname", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("닉네임 응답:", response.data);

        setNickname(response.data.nickname || "닉네임 없음");
        setPhotoUrl(response.data.photoUrl || "https://via.placeholder.com/150"); // 사진 URL 설정
      } catch (error) {
        console.error("닉네임 데이터 로드 실패:", error);
        alert("닉네임 데이터를 로드하는 중 오류가 발생했습니다.");
      }
    };

    fetchPartnerStatus();
    fetchNickname();
  }, []);

  const main = () => navigate("/main");
  const vroonglist = () => navigate("/vroonglist");
  const chat = () => navigate("/chat");
  const profile = () => navigate("/profile");
  const OpProfile = () => navigate("/opprofile");
  const goPartnership = () => navigate("/partnership/step1");
  const goVroongMoney = () => navigate("/vroongmoney");

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
        <div className={styles.profileinfo} onClick={OpProfile}>
          <img
            src={photoUrl} // 동적으로 가져온 사진 URL 사용
            alt="프로필"
            className={styles.profileimage}
          />
          <span className={styles.profilename}>{nickname}</span>
          {partnerStatus === "pending" && (
            <span className={styles.partnerstatus}>파트너 지원중</span>
          )}
          <img
            src={nextarrow}
            className={styles.nextarrow}
            alt="화살표 버튼"
          />
        </div>
        {partnerStatus === "complete" ? (
          <div
            className={styles.moneysection}
            onClick={goVroongMoney}
          >
            <div className={styles.moneycontainer}>
              <span className={styles.moneytitle}>부릉머니</span>
              <span className={styles.moneyamount}>
                {vroongMoney.toLocaleString()}원
              </span>
            </div>
            <span className={styles.moneydot}></span>
          </div>
        ) : (
          <div
            className={styles.moneysection}
            onClick={goPartnership}
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
