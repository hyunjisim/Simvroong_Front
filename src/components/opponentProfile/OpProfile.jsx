import React, { useState } from 'react';
import './OpProfile.css';
import { useNavigate } from 'react-router-dom';
import panda from '../../img/panda.png'

const OpProfile = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReviewMenu, setShowReviewMenu] = useState(null);
  const navigate = useNavigate();
  // 더미데이터
  const reviews = [
    { id: 1, rating: '🌟🌟🌟🌟🌟', text: '정말 최고에요!' },
    { id: 2, rating: '🌟🌟🌟🌟', text: '빠르고 친절해요.' },
    { id: 3, rating: '🌟🌟🌟🌟🌟', text: '다시 이용할게요!' },
  ];

  const hasReviews = reviews.length > 0;

  return (
    <div className="profile-container">
      <header className="profile-header">
        <span
          className="back-arrow-text"
          onClick={() => navigate('/chat')} // Chat 폴더의 chat.jsx로 이동
        >
          &larr; {/* 텍스트 화살표 */}
        </span>
        <h1>프로필</h1>
        <button className="menu-button" onClick={() => setShowMenu(!showMenu)}>
          •••
        </button>
        {showMenu && (
          <div className="dropdown-menu">
            <button>차단하기</button>
            <button>신고</button>
          </div>
        )}
      </header>

      <main className="profile-main">
        <section className="profile-user">
          <img
            src={panda}
            alt="프로필 사진"
            className="profile-photo"
          />
          <div className="profile-info">
            <h2>유덩규</h2>
            <p>프로페셔널 지원자</p>
          </div>
        </section>

        <section className="profile-stats">
          <div className="stat-item" onClick={() => navigate('/vroongList')}>
            <strong>304</strong>
            <span>활동</span>
          </div>
          <div className="stat-item" onClick={() => navigate('/commitment')}>
            <strong>0</strong>
            <span>수행</span>
          </div>
          <div className="stat-item" onClick={() => navigate('/review')}>
            <strong>5</strong>
            <span>리뷰</span>
          </div>
        </section>

        <section className="profile-intro">
          <h3>자기 소개</h3>
          <p>시간과 차별화로 안전하고 빠르게 배달해드립니다!</p>
        </section>

        <section className="profile-services">
          <h3>제공 상품들</h3>
          <div className="services-list">
            <button>편의점 배달</button>
            <button>음식 배달</button>
            <button>음식/주류 배달</button>
            <button>물품 배달</button>
            <button>직 배송</button>
            <button>...</button>
          </div>
        </section>

        {hasReviews && (
          <section className="profile-reviews">
            <h3>받은 거래 후기 {reviews.length}</h3>
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>{review.rating}</p>
                  <p>{review.text}</p>
                  <button
                    className="review-menu-button"
                    onClick={() => setShowReviewMenu(review.id)}
                  >
                    •••
                  </button>
                  {showReviewMenu === review.id && (
                    <div className="dropdown-menu">
                      <button>신고</button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
};

export default OpProfile;
