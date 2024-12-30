import React from "react";
import "./Review.module.css";

const Review = () => {
    return (
        <div className="review-container">
            <header className="review-header">
                <span className="back-button">←</span>
                <h1 className="header-title">리뷰 내역</h1>
            </header>

            <div className="profile-section">
                <img
                    src="https://via.placeholder.com/50"
                    alt="profile"
                    className="profile-image"
                />
                <div className="profile-info">
                    <div className="profile-name">유딩꾸</div>
                    <div className="profile-detail">남성 · 20대</div>
                </div>
            </div>

            <div className="tab-menu">
                <span className="tab">수행</span>
                <span className="tab active">리뷰 3</span>
            </div>

            <ul className="review-list">
                <li className="review-item">
                    <div className="reviewer-name">유노주호</div>
                    <div className="review-time">서울특별시 강남구 · 1년 전</div>
                    <div className="review-content">
                        의뢰시간 맞춰서 오셔서 좋았습니다
                    </div>
                </li>
                <li className="review-item">
                    <div className="reviewer-name">가누건후유</div>
                    <div className="review-time">서울특별시 동작구 · 6개월 전</div>
                    <div className="review-content">
                        의뢰 예상 소요시간 보다 훨씬 빠르게 해주셔서...
                    </div>
                </li>
                <li className="review-item">
                    <div className="reviewer-name">유진자람</div>
                    <div className="review-time">경기도 판교구 · 4일 전</div>
                    <div className="review-content">감사합니다</div>
                </li>
            </ul>
        </div>
    );
};

export default Review;
