import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅
import "./around.css";

const Around = () => {
  const [map, setMap] = useState(null);
  const [isListExpanded, setIsListExpanded] = useState(false); // 리스트 확장 상태 관리
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const [requests, setRequests] = useState([
    {
      id: 1,
      title: "다이소 양면 테이프 사다주세요",
      distance: 355,
      price: "15,000원",
      img: "/images/item1.png",
      time: 20,
      likes: 3,
      comments: 4,
    },
    {
      id: 2,
      title: "이불 빨래 건조 대신 해주세요",
      distance: 405,
      price: "10,000원",
      img: "/images/item2.png",
      time: 180,
      likes: 1,
      comments: 1,
    },
    {
      id: 3,
      title: "약국에서 밀크씨슬 사주세요",
      distance: 565,
      price: "10,000원",
      img: "/images/item3.png",
      time: 300,
      likes: 11,
      comments: 11,
    },
  ]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://dapi.kakao.com/v2/maps/sdk.js?appkey=13b8c794d0b93e1fdcf15f668149cf35";
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 지도 중심 좌표
          level: 4, // 확대 레벨 (숫자가 작을수록 더 확대됨)
        };

        const newMap = new window.kakao.maps.Map(container, options); // 지도 생성
        setMap(newMap);

        // 요청 데이터를 기반으로 마커 추가
        requests.forEach((req, index) => {
          const markerPosition = new window.kakao.maps.LatLng(
            37.5665 + index * 0.001, // 위도
            126.9780 + index * 0.001 // 경도
          );

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: newMap,
          });

          // 커스텀 오버레이 추가 (마커 번호 표시)
          const customOverlay = new window.kakao.maps.CustomOverlay({
            position: markerPosition,
            content: `<div class="marker">${index + 1}</div>`,
          });
          customOverlay.setMap(newMap);
        });
      }
    };

    script.onerror = () => {
      console.error("카카오 맵 API 스크립트를 로드하는 데 실패했습니다.");
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [requests]);

  const toggleList = () => {
    setIsListExpanded((prev) => !prev); // 리스트 확장 상태 토글
  };

  return (
    <div className="around-container">
      {/* 헤더 */}
      <div className="header">
        <button className="back-btn" onClick={() => navigate("/profile")}>
          ←
        </button>
        <h1>내 주변</h1>
      </div>

      {/* 지도 */}
      <div id="map" className="map"></div>

      {/* 리스트 컨테이너 */}
      <div className={`list-container ${isListExpanded ? "expanded" : ""}`}>
        <button className="expand-btn" onClick={toggleList}></button> {/* 확장 버튼 */}
        {requests.map((req) => (
          <div key={req.id} className="request-item">
            <div className="request-image">
              <img src={req.img} alt={req.title} />
            </div>
            <div className="request-details">
              <div className="request-header">
                <h3>{req.title}</h3>
                <p>
                  <span>📍 {req.distance}m</span> · <span>⏱ {req.time}분 전</span>
                </p>
              </div>
              <div className="request-footer">
                <p className="price">{req.price}</p>
                <div className="actions">
                  <button className="like-btn">❤️ {req.likes}</button>
                  <button className="comment-btn">💬 {req.comments}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Around;
