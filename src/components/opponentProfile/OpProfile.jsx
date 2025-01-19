import React, { useState, useEffect } from "react";
import styles from "./OpProfile.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import panda from "../../img/panda.png";

const defaultProfileData = {
  name: "정보 없음",
  photo: panda,
  tasks: ["등록된 심부름이 없습니다."],
  vehicle: "등록되지 않음",
  certificates: [],
  reviews: [],
  stats: {
    activities: 0,
    completedTasks: 0,
    reviewCount: 0,
  },
};

const OpProfile = () => {
  const [profileData, setProfileData] = useState(defaultProfileData); // 초기 데이터 설정
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewMenu, setShowReviewMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("authToken");
      try {
        const response = await axios.get("http://127.0.0.1:8080/profile", {
          headers: token
            ? { Authorization: `Bearer ${token}` }
            : undefined,
        });

        const fetchedData = response.data || {};
        setProfileData({
          name: fetchedData.name || "정보 없음",
          photo: fetchedData.photoUrl || panda,
          tasks: fetchedData.tasks || ["등록된 심부름이 없습니다."],
          vehicle: fetchedData.vehicle || "등록되지 않음",
          certificates: fetchedData.certificates || [],
          reviews: fetchedData.reviews || [],
          stats: fetchedData.stats || {
            activities: 0,
            completedTasks: 0,
            reviewCount: 0,
          },
        });
      } catch (error) {
        console.error("프로필 데이터를 가져오는 중 오류가 발생했습니다.", error);
        setProfileData(defaultProfileData); // 기본 데이터 설정
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>프로필 데이터를 불러오는 중...</div>;
  }

  const {
    name,
    photo,
    tasks,
    vehicle,
    certificates,
    reviews,
    stats,
  } = profileData;

  const handleReport = async (reviewId) => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8080/report",
        { reviewId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("신고가 접수되었습니다.");
      setShowReviewMenu(null);
    } catch (error) {
      console.error("신고 요청 중 오류 발생:", error);
      alert("신고 요청에 실패했습니다.");
    }
  };

  return (
    <div className={styles.profileContainer}>
      <header className={styles.profileHeader}>
        <span
          className={styles.backArrowText}
          onClick={() => navigate("/profile")}
        >
          &larr;
        </span>
        <h1>프로필</h1>
      </header>

      <main className={styles.profileMain}>
        {/* 사용자 정보 */}
        <section className={styles.profileUser}>
          <img
            src={photo}
            alt="프로필 사진"
            className={styles.profilePhoto}
            onError={(e) => (e.target.src = panda)} // 이미지 로딩 실패 시 기본 이미지로 대체
          />
          <div className={styles.profileInfo}>
            <h2>{name}</h2>
          </div>
        </section>

        {/* 활동, 수행, 리뷰 통계 */}
        <section className={styles.profileStats}>
          <div className={styles.statBox}>
            <h3>활동</h3>
            <p>{stats.activities}</p>
          </div>
          <div className={styles.statBox}>
            <h3>수행</h3>
            <p>{stats.completedTasks}</p>
          </div>
          <div className={styles.statBox}>
            <h3>리뷰</h3>
            <p>{stats.reviewCount}</p>
          </div>
        </section>

        {/* 자기 소개 */}
        <section className={styles.profileServices}>
          <h3>자기 소개</h3>
          <p>시간과 차별화로 안전하고 빠르게 배달해드립니다!</p>
        </section>

        {/* 수행 가능한 심부름 */}
        <section className={styles.profileServices}>
          <h3>수행 가능한 심부름</h3>
          <div className={styles.servicesList}>
            {tasks.length > 0 ? (
              tasks.map((task, index) => <button key={index}>{task}</button>)
            ) : (
              <p>등록된 심부름이 없습니다.</p>
            )}
          </div>
        </section>

        {/* 이동 수단 */}
        {vehicle && (
          <section className={styles.profileVehicle}>
            <h3>이동 수단</h3>
            <p>{vehicle}</p>
          </section>
        )}

        {/* 보유 자격증 */}
        {certificates && (
          <section className={styles.profileCertificates}>
            <h3>보유 자격증</h3>
            <ul>
              {certificates.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </section>
        )}

        {/* 받은 거래 후기 */}
        {reviews && (
          <section className={styles.profileReviews}>
            <h3>받은 거래 후기 {reviews.length}</h3>
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>{review.text}</p>
                  <button
                    className={styles.reviewMenuButton}
                    onClick={() =>
                      setShowReviewMenu(showReviewMenu === review.id ? null : review.id)
                    }
                  >
                    ⁝
                  </button>
                  {showReviewMenu === review.id && (
                    <div className={styles.dropdownMenu}>
                      <button
                        className={styles.reportButton}
                        onClick={() => handleReport(review.id)}
                        disabled={!sessionStorage.getItem("authToken")} // 로그인 안 한 경우 비활성화
                      >
                        신고
                      </button>
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
