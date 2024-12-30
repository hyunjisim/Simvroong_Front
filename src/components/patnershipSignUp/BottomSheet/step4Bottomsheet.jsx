import React from "react";
import styles from "./step4Bottomsheet.module.css";

const BottomSheet = ({ onClose, onSelect }) => {
    const errandsList = [
        "배달 · 퀵",
        "청소 · 집안일",
        "설치 · 수리",
        "이사 · 운반",
        "대행",
        "알바",
        "반려동물",
        "돌봄 · 육아",
        "기타",
    ]; // 심부름 카테고리 리스트

    return (
        <div className={styles.bottomSheetOverlay}>
        <div className={styles.bottomSheet}>
            <div className={styles.header}>
            <h3>심부름 카테고리</h3>
            </div>
            <ul className={styles.list}>
            {errandsList.map((errand, index) => (
                <li
                key={index}
                className={styles.listItem}
                onClick={() => onSelect(errand)}
                >
                {errand}
                </li>
            ))}
            </ul>
            <button className={styles.closeButton} onClick={onClose}>
            닫기
            </button>
        </div>
        </div>
    );
};

export default BottomSheet;
