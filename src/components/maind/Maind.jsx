import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backb from "../../img/back-arrow.png";
import styles from "./Maind.module.css";
import axios from "axios";

const Maind = () => {
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  // 뒤로 가기 버튼
  const goBack = () => {
    navigate("/main");
  };

  // 전체 삭제 버튼 클릭 핸들러
  const handleClearAll = () => {
    setRecentSearches([]);
    sessionStorage.removeItem("recentSearches");
  };

  // 개인 삭제 버튼
  const handleDeleteSearch = (id) => {
    const updatedSearches = recentSearches.filter((search) => search.id !== id);
    setRecentSearches(updatedSearches);
    sessionStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  // 검색 입력 핸들러
  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // 검색어 추가 핸들러
  const handleAddSearch = async (encodedText) => {
    if (!encodedText) return;

    const now = new Date();
    const formattedTime = `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;

    const newSearch = {
      id: Date.now(),
      text: decodeURIComponent(encodedText),
      time: formattedTime,
    };

    setRecentSearches([newSearch, ...recentSearches]);
    setSearchText("");

    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.get(
        `http://127.0.0.1:8080/search/?keyword=${encodedText}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 응답 데이터가 유효한지 확인 후 처리
      if (response.data && Array.isArray(response.data.results)) {
        const formattedResults = response.data.results.map((order) => ({
          taskId: order.taskId,
          title: order.title,
          thumnail: order.thumnail || "https://via.placeholder.com/60",
          location: order.location?.area || "지역 정보 없음",
          schedule: order.schedule?.estimatedDuration || "시간 정보 없음",
          payment: order.payment?.serviceFee
            ? `${order.payment.serviceFee.toLocaleString()}원`
            : "0원",
          likesCount: order.likesCount || 0,
          questionsCount: order.questionsCount || 0,
          isFeeNegotiable: order.isFeeNegotiable || false,
          createdAt: new Date(order.createdAt).toLocaleDateString(),
        }));

        setSearchResults(formattedResults);
      } else {
        console.error("검색 결과가 비어 있거나 잘못된 형식입니다:", response.data);
        alert("검색 결과를 처리할 수 없습니다.");
      }
    } catch (error) {
      console.error("검색 요청 실패:", error);
      alert("연관된 검색어가 없습니다.");
    }
  };

  // 페이지네이션 처리
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const currentResults = Array.isArray(searchResults)
    ? searchResults.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  useEffect(() => {
    const savedSearches = JSON.parse(sessionStorage.getItem("recentSearches") || "[]");
    setRecentSearches(savedSearches);
  }, []);

  return (
    <div className={styles.container}>
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
              const encodedText = encodeURIComponent(searchText);
              handleAddSearch(encodedText);
            }
          }}
        />
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
      <div className={styles.recentList}>
        {recentSearches.map((search) => (
          <li key={search.id}>
            <span className={styles.clockIcon}>⏲</span> {search.text}{" "}
            <span className={styles.time}>{search.time}</span>{" "}
            <span
              className={styles.deleteIcon}
              onClick={() => handleDeleteSearch(search.id)}
            >
              ✕
            </span>
          </li>
        ))}
        {recentSearches.length === 0 && (
          <p className={styles.noRecent}>최근 검색어가 없습니다.</p>
        )}
      </div>

      {/* 검색 결과 */}
      {searchText.trim() !== "" && searchResults.length > 0 && (
        <div className={styles.searchResults}>
          <h3>검색 결과</h3>
          <ul className={styles.resultList}>
            {currentResults.map((result) => (
              <li
                key={result.taskId}
                className={styles.resultItem}
                onClick={() => navigate(`/post/${result.taskId}`)}
              >
                <img
                  src={result.thumnail}
                  alt={result.title}
                  className={styles.resultImage}
                />
                <div className={styles.resultContent}>
                  <h4>{result.title}</h4>
                  <p>{result.location}</p>
                  <p>{result.schedule}</p>
                  <p className={styles.resultPrice}>{result.payment}</p>
                  <p className={styles.resultStats}>
                    ❤️ {result.likesCount} | 💬 {result.questionsCount}{" "}
                    {result.isFeeNegotiable && <span>💸 협의 가능</span>}
                  </p>
                  <p className={styles.resultDate}>작성일: {result.createdAt}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              이전
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= searchResults.length}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maind;
