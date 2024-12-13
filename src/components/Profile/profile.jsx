import React from "react";
import panda from "../../img/panda.png"; // 프로필 이미지를 임포트
import "./profile.css";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";

const Profile = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수
  return (
    <div className="profile-container">
      {/* 상단 헤더 */}
      <div className="header">
        <h1>프로필</h1>
      </div>

      {/* 프로필 카드 */}
      <div className="profile-card">
        <div className="profile-info">
          <img
            src={panda} // 프로필 이미지 URL
            alt="프로필"
            className="profile-image"
          />
          <span className="profile-name">유딩뀨</span>
        </div>
        <div className="money-section">
          <div className="money-container">
            <span className="money-title">부릉머니</span>
            <span className="money-value">50,000원</span>
          </div>
          <span className="money-dot"></span>
        </div>
      </div>

      {/* 메뉴 리스트 */}
      <ul className="menu-list">
        {[
          { icon: "📢", text: "공지사항" },
          { icon: "❤️", text: "찜 목록"},
          { icon: "❓", text: "자주 하는 질문"},
          { icon: "⚙️", text: "설정" },
          { icon: "👤", text: "회원 정보 조회 및 수정"},
          { icon: "📜", text: "약관 및 정책"},
        ].map((item, index) => (
          <li key={index} className="menu-item">
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.text}</span>
            <span className="menu-count">{item.count}</span>
          </li>
        ))}
      </ul>

      {/* 푸터 */}
      <footer className="main-footer">
        <button onClick={() => navigate('/home')}>
          <img src={Home_none} alt="홈" />
          <span>홈</span>
        </button>
        <button onClick={() => navigate('/vroonglist')}>
          <img src={Details_none} alt="이용내역"/>
          <span>이용내역</span>
        </button>
        <button onClick={() => navigate('/chat')}>
          <img src={Chat_none} alt="채팅" />
          <span>채팅</span>
        </button>
        <button onClick={() => navigate('/profile')}>
          <img src={Profile_none} alt="내 정보" />
          <span>내 정보</span>
        </button>
      </footer>
    </div>
  );
};

export default Profile;
