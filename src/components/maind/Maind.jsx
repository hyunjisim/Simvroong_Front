import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backb from "../../img/back-arrow.png";
import styles from "./Maind.module.css";

const Maind = () => {
    // 검색 입력 상태
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  // 최근 검색어 리스트 상태
  const [recentSearches, setRecentSearches] = useState([]);

  // 뒤로 가기 버튼
  const goBack = () => {
    navigate("/main");
  };

  // 전체 삭제 버튼 클릭 핸들러
  const handleClearAll = () => {
    setRecentSearches([]); // 리스트를 빈 배열로 설정
  };

  // 개인 삭제 버튼
  const handleDeleteSearch = (id) => {
    setRecentSearches(recentSearches.filter((search) => search.id !== id)); 
  };

  // 검색 입력 핸들러
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // 검색어 추가 핸들러
  const handleAddSearch = () => {
    if (searchText.trim() === "") return; // 빈 입력은 추가하지 않음

    // 현재 시간 가져오기
    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    // 새 검색어 추가
    const newSearch = {
      id: Date.now(), // 고유 ID 생성
      text: searchText,
      time: formattedTime,
    };

    setRecentSearches([newSearch, ...recentSearches]); // 새 검색어를 리스트에 추가
    setSearchText(""); // 입력 필드 초기화
  };

  return (
    <div className={styles.container}>
      {/* 메인 헤더 */}
      <div className={styles.mainheader}>
        <img
          onClick={goBack}
          src={backb}
          className={styles.backb}
          alt="뒤로가기 버튼"
        />
        <input
          type="text"
          placeholder="검색 내용 입력"
          className={styles.searchBar}
          value={searchText}
          onChange={handleInputChange}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleAddSearch(); // Enter 키를 누르면 검색어 추가
            }
          }}
        />
      </div>
      <div className={styles.hrlines}></div>
      {/* 인기 검색어 */}
      <div className={styles.popularSection}>
        <h2 className={styles.popularsearch}>
          연관 심부름
          <span className={styles.updateTime}>17:24 업데이트</span>
        </h2>
        <ul className={styles.popularList}>
          <li className={styles.topRank}>
            <span className={styles.topRankNumber}>1.</span> 산책
          </li>
          <li className={styles.topRank}>
            <span className={styles.topRankNumber}>2.</span> 서류 작성
          </li>
          <li className={styles.topRank}>
            <span className={styles.topRankNumber}>3.</span> 단순 업무
          </li>
          <li>
            <span className={styles.topRankNumber4}>4.</span> 레포트
          </li>
          <li>
            <span className={styles.topRankNumber5}>5.</span> 줄서기
          </li>
          <li>
            <span className={styles.topRankNumber6}>6.</span> 프린트
          </li>
        </ul>
      </div>
      <div className={styles.hrlines}></div>
      {/* 최근 검색어 */}
      <div className={styles.recentSection}>
        <h2 className={styles.recentsearch}>
          최근 검색어
          <span className={styles.clearAll} onClick={handleClearAll}>
            전체 삭제
          </span>
        </h2>
      </div>
      {/* 최근 검색어 리스트 */}
      <div className={styles.recentList}>
        {recentSearches.map((search) => (
          <li key={search.id}>
            <span className={styles.clockIcon}>⏲</span> {search.text}{" "}
            <span className={styles.time}>{search.time}</span>{" "}
            <span 
                className={styles.deleteIcon}
                onClick={() => handleDeleteSearch(search.id)}>✕</span>
          </li>
        ))}
        {recentSearches.length === 0 && (
          <p className={styles.noRecent}>최근 검색어가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Maind;
