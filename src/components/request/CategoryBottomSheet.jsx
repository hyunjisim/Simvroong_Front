import React from "react";
import styles from "./CategoryBottomSheet.module.css";

const categories = [
  "배달·퀵",
  "청소·집안일",
  "설치·수리",
  "이사·운반",
  "대행",
  "알바",
  "반려동물",
  "돌봄·육아",
  "기타",
];

const CategoryBottomSheet = ({ onClose, onSelect }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.bottomSheet}>
        <h2 className={styles.title}>의뢰할 심부름의 카테고리를 선택해주세요.</h2>
        <div className={styles.categoryList}>
          {categories.map((category) => (
            <button
              key={category}
              className={styles.categoryButton}
              onClick={() => onSelect(category)} // 카테고리 선택
            >
              {category}
            </button>
          ))}
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CategoryBottomSheet;
