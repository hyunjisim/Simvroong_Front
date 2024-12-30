import React, { useState } from "react";
import styles from "./TransportBottomSheet.module.css";

const TransportBottomSheet = ({ onClose, onConfirm }) => {
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        "차량",
        "오토바이",
        "자전거",
        "대중교통·도보",
        "킥보드·전기자전거",
    ];

    const handleSelect = (option) => {
        setSelectedOptions((prev) =>
        prev.includes(option)
            ? prev.filter((item) => item !== option)
            : [...prev, option]
        );
    };
    

    return (
    <div className={styles.bottomSheetOverlay}>
        <div className={styles.bottomSheet}>
            <h3 className={styles.title}>배달수단</h3>
            <p className={styles.subtitle}>배달 수단을 선택해주세요</p>
            <div className={styles.options}>
                {options.map((option) => (
                    <div
                        key={option}
                        className={`${styles.option} ${
                            selectedOptions.includes(option) ? styles.selected : ""
                        }`}
                        onClick={() => handleSelect(option)}
                    >
                        {option}
                        {selectedOptions.includes(option) && <span>✔</span>}
                    </div>
                ))}
            </div>
            <div className={styles.buttongroup}>
                <button className={styles.closeButton} onClick={onClose}>
                    취소
                </button>
                <button
                    className={styles.confirmButton}
                    onClick={() => onConfirm(selectedOptions)}
                >
                    완료
                </button>
            </div>
        </div>
    </div>
    );
};

export default TransportBottomSheet;
