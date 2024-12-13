import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 추가
import "./main.css";
import simvroong from "../../img/simvroong.png";
import bellIcon from "../../img/bell.png"; // 종 모양 이미지
import searchIcon from "../../img/search.png"; // 검색 이미지
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";

const Main = () => {
  const [activeCategory, setActiveCategory] = useState("전체");
  const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

  const categories = [
    "전체",
    "배달/퀵",
    "청소/집안일",
    "설치/수리",
    "이사/운반",
    "대행",
    "알바",
    "반려동물",
    "돌봄/육아",
    "기타",
  ];

  const allItems = [
    { id: 1, title: "클로크팟 판매 도와주세요", category: "기타", distance: "3.9km", time: "20분 전", price: "30,000원", likes: 6, comments: 2, image: '' },
    { id: 2, title: "정말 눈 좀 치워주세요", category: "청소/집안일", distance: "4.1km", time: "1시간 전", price: "20,000원", likes: 4, comments: 3, image: '' },
    { id: 3, title: "편의점에서 과자 사다주세요", category: "배달/퀵", distance: "4.1km", time: "5분 전", price: "15,000원", likes: 8, comments: 5, image: '' },
    { id: 4, title: "다이소 양면 테이프 사다주세요", category: "배달/퀵", distance: "355m", time: "20분 전", price: "15,000원", likes: 2, comments: 1, image: '' },
    { id: 5, title: "약국에서 밀크시슬 사다주세요", category: "배달/퀵", distance: "355m", time: "3시간 전", price: "10,000원", likes: 3, comments: 2, image: '' },
    { id: 6, title: "핫팩 있으신 분... 너무 추워요", category: "기타", distance: "355m", time: "35분 전", price: "10,000원", likes: 11, comments: 6, image: '' },
    { id: 7, title: "이불 빨래 검소 대신 해주세요", category: "청소/집안일", distance: "355m", time: "1시간 전", price: "10,000원", likes: 4, comments: 3, image: '' },
  ];

  const filteredItems = activeCategory === "전체" ? allItems : allItems.filter(item => item.category === activeCategory);

  const scrollLeft = () => {
    const wrapper = document.querySelector(".category-wrapper");
    wrapper.scrollBy({ left: -wrapper.clientWidth / 1.5, behavior: "smooth" });
  };
  
  const scrollRight = () => {
    const wrapper = document.querySelector(".category-wrapper");
    wrapper.scrollBy({ left: wrapper.clientWidth / 1.5, behavior: "smooth" });
  };

  // 알림 페이지 이동 함수
  const handleBellClick = () => {
    navigate("/alrim");
  };

  return (
    <div className="main-container">
      {/* 헤더 */}
      <header className="main-header">
        <img src={simvroong} alt="심부름 로고" className="logo" />
        <div className="header-icons">
          <img
            src={bellIcon}
            alt="알림"
            className="header-icon"
            onClick={handleBellClick}
          />
          <img src={searchIcon} alt="검색" className="header-icon" />
        </div>
      </header>

      {/* 카테고리 버튼 */}
      <div className="category-container">
        <button className="scroll-button left" onClick={scrollLeft}>◀</button>
        <div className="category-wrapper">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${activeCategory === category ? "active-category" : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button className="scroll-button right" onClick={scrollRight}>▶</button>
      </div>

      

      {/* 메인 리스트 */}
      <main className="item-list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="item" onClick={() => navigate('/postpage')}>
              <img src={item.image} alt="item" className="item-image" />
              <div className="item-content">
                <h3>{item.title}</h3>
                <p>📍{item.distance} · ⏱{item.time}</p>
                <span className="item-price">{item.price}</span>
              </div>
              <div className="item-icons">
                <div className="comments">
                  💬 {item.comments}
                </div>
                <div className="likes">
                  ❤️ {item.likes}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-items">해당 카테고리에 아이템이 없습니다.</p>
        )}
      </main>

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

export default Main;



// 이 부분 백엔드 연결을 위해 만들어 놈
  // 백엔드에서 데이터를 가져오는 함수
  // const fetchItems = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/items"); // 백엔드 API URL
  //     setAllItems(response.data); // 받아온 데이터를 상태에 저장
  //   } catch (error) {
  //     console.error("데이터를 가져오는 중 오류 발생:", error);
  //   }
  // };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  // useEffect(() => {
  //   fetchItems();
  // }, []);