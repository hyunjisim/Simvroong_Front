import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import styles from "./main.module.css";
import simvroong from "../../img/simvroong.png";
import bellIcon from "../../img/bell.png";
import searchIcon from "../../img/search.png";
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";

import All from "../../img/mainsel/All.png";
import Deliver from "../../img/mainsel/Delivery.png";
import Cleaning from "../../img/mainsel/Cleaning.png";
import Repair from "../../img/mainsel/Repair.png";
import Transporting from "../../img/mainsel/Transporting.png";
import Replace from "../../img/mainsel/Replace.png";
import PartTime from "../../img/mainsel/PartTime.png";
import Pet from "../../img/mainsel/Pet.png";
import Baby from "../../img/mainsel/Baby.png";
import Other from "../../img/mainsel/Other.png";

import Request from "../../img/mainsel/Request.png";
import RequestFull from "../../img/mainsel/RequestFull.png";
import Around from "../../img/mainsel/Around.png";


const Main = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "전체"
  );
  const [allItems, setAllItems] = useState([]);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);

  const navigate = useNavigate();
  const categoryWrapperRef = useRef(null);

  const categories = [
    { name: "전체", value: "전체", img: All },
    { name: "배달·퀵", value: "배달·퀵", img: Deliver },
    { name: "청소·집안일", value: "청소·집안일", img: Cleaning },
    { name: "설치·수리", value: "설치·수리", img: Repair },
    { name: "이사·운반", value: "이사·운반", img: Transporting },
    { name: "대행", value: "대행", img: Replace },
    { name: "알바", value: "알바", img: PartTime },
    { name: "반려동물", value: "반려동물", img: Pet },
    { name: "돌봄·육아", value: "돌봄·육아", img: Baby },
    { name: "기타", value: "기타", img: Other },
  ];

  const handleMessage = async (e) => {
    try {
      const parsedData = JSON.parse(e.data);
      const expoToken = JSON.stringify(parsedData.expoToken);
      // alert(expoToken)
      sessionStorage.setItem("expoToken", expoToken)
      sendExpoTokenToServer();
    } catch (error) {
      console.error("Error handling WebView message:", error);
    }
  };
  
  const sendExpoTokenToServer = async () => {
    try {
      const token = sessionStorage.getItem("authToken");
      //alert(token)
      //const expoToken = JSON.parse(sessionStorage.getItem("expoToken"));
      const expoToken = sessionStorage.getItem("expoToken")
      //alert(expoToken)
      const response = await axios.post(
        "http://192.168.163.8:8080/notification/saveToken",
        { token : expoToken },
        { 
          headers: { Authorization: `Bearer ${token}`}
        }
      );
      console.log("서버 응답:", response.data);
    } catch (error) {
      console.error("서버로 Expo Token 전송 중 오류 발생:", error);
    }
  };

  
  useEffect(() => {
    document.addEventListener("message", handleMessage);
  
    return () => {
      // document.removeEventListener("message", handleMessage);
    };
  }, []);
  
  const fetchItems = async (category = "전체") => {
    try {
      const token = sessionStorage.getItem("authToken");
      const url =
        category === "전체"
          ? "http://192.168.163.8:8080/main"
          : `http://192.168.163.8:8080/main?category=${encodeURIComponent(category)}`;
  
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("응답 데이터:", response.data.data); // 여기서 taskId 확인
      setAllItems(response.data.data || []);
    } catch (error) {
      console.error("데이터 불러오기 오류:", error.message);
      setAllItems([]);
    }
  };

  useEffect(() => {
    const category = searchParams.get("category") || "전체";
    fetchItems(category); // URL의 category를 기반으로 데이터 가져오기
  }, [searchParams]);

  const handleCategoryClick = (categoryValue) => {
    setActiveCategory(categoryValue);
    setSearchParams({ category: categoryValue });
  };
  
  const filteredItems =
  activeCategory === "전체"
    ? allItems
    : allItems.filter((item) => item.category?.trim() === activeCategory.trim());

  const scrollLeft = () => {
    if (categoryWrapperRef.current) {
      categoryWrapperRef.current.scrollBy({
        left: -categoryWrapperRef.current.clientWidth / 1.5,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (categoryWrapperRef.current) {
      categoryWrapperRef.current.scrollBy({
        left: categoryWrapperRef.current.clientWidth / 1.5,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (window.scrollY === 0) {
      setIsScrolledToTop(true);
    } else {
      setIsScrolledToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goToPostPage = (taskId) => {
    navigate(`/post/${taskId}`);
  };

  return (
    <div className={styles.mainContainer}>
      {/* 헤더 */}
      <header className={styles.mainHeader}>
        <img src={simvroong} alt="심부름 로고" className={styles.logo} />
        <div className={styles.headerIcons}>
          <img src={bellIcon} alt="알림" className={styles.headerIcon} />
          <img src={searchIcon} alt="검색" className={styles.headerIcon} onClick={() => navigate("/maind")}/>
        </div>
      </header>

      {/* 카테고리 */}
      <div className={styles.categorySection}>
        <button className={styles.scrollButton} onClick={scrollLeft}>
          ◀
        </button>
        <div className={styles.categoryWrapper} ref={categoryWrapperRef}>
          {categories.map((category) => (
            <div
              key={category.value}
              className={`${styles.category} ${
                activeCategory === category.value ? styles.activeCategory : ""
              }`}
              onClick={() => handleCategoryClick(category.value)}
            >
              <img
                src={category.img}
                alt={category.name}
                className={styles.categoryIcon}
              />
              <span className={styles.categoryText}>{category.name}</span>
            </div>
          ))}
        </div>
        <button className={styles.scrollButton} onClick={scrollRight}>
          ▶
        </button>
      </div>

      {/* 메인 리스트 */}
      <main className={styles.itemList}>
        {filteredItems.map((item) => (
          <div
            key={item.taskId}
            className={styles.item}
            onClick={() => goToPostPage(item.taskId)}
          >
            <div className={styles.itemDetails}>
              <h3>{item.title}</h3>
              <img
                src={item.thumnail}
                alt={item.title}
                className={styles.itemImage}
              />
              <p>{item.location?.area || "지역 정보 없음"}</p>
              <p>{item.schedule?.estimatedDuration || "시간 정보 없음"}</p>
              <span className={styles.itemPrice}>
                {item.payment.serviceFee || "금액 정보 없음"}
              </span>
            </div>
            <div className={styles.itemIcons}>
              <span>❤️ {item.likesCount || 0}</span>
              <span>💬 {item.questionsCount || 0}</span>
              <span>{item.isFeeNegotiable ? "금액제한 가능" : " "}</span>
            </div>
          </div>
        ))}
      </main>

      {/* 고정된 하단 아이콘 */}
      <div className={styles.fixedIcons}>
        <img
          src={Around}
          alt="주변"
          className={`${styles.fixedIcon} ${styles.leftBottomIcon}`}
          onClick={() => navigate("/around")}
        />
        <img
          src={isScrolledToTop ? RequestFull : Request}
          alt="요청"
          className={`${styles.fixedIcon} ${styles.rightBottomIcon}`}
          onClick={() => navigate("/request")}
        />
      </div>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <button onClick={() => navigate("/main")}>
          <img src={Home_none} alt="홈" />
          홈
        </button>
        <button onClick={() => navigate("/vroonglist")}>
          <img src={Details_none} alt="이용내역" />
          이용내역
        </button>
        <button onClick={() => navigate("/chat")}>
          <img src={Chat_none} alt="채팅" />
          채팅
        </button>
        <button onClick={() => navigate("/profile")}>
          <img src={Profile_none} alt="내 정보" />
          내 정보
        </button>
      </footer>
    </div>
  );
};

export default Main;