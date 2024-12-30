import React from "react";
import styles from "./BottomSheet.module.css"; // CSS 모듈 스타일링


const BankSelection = ({ onClose, onSelect }) => {
    const banks = [
        {  name: "경남은행" },
        {  name: "광주은행" },
        {  name: "국민은행" },
        {  name: "기업은행" },
        {  name: "농협은행" },
        {  name: "대구은행" },
        {  name: "미래에셋증권" },
        {  name: "부산은행" },
        {  name: "산업은행" },
        {  name: "새마을금고" },
        {  name: "수협은행" },
        {  name: "신한은행" },
        {  name: "신협은행" },
        {  name: "씨티은행" },
        {  name: "외환은행" },
        {  name: "우리은행" },
        {  name: "우체국" },
        {  name: "저축은행중앙회" },
        {  name: "전북은행" },
        {  name: "제주은행" },
        {  name: "카카오뱅크" },
        {  name: "케이뱅크" },
        {  name: "KEB하나은행" },
        {  name: "SC제일은행" },
    ];

    return (
        <div className={styles.bottomSheet}>
            <div className={styles.header}>
            </div>
            <ul className={styles.bankList}>
                {banks.map((bank, index) => (
                    <li
                        key={index}
                        className={styles.bankItem}
                        onClick={() => onSelect(bank)}
                    >
                        {bank.name}
                    </li>
                ))}
            </ul>
            <div className={styles.closeButtonBackground}>
                <button className={styles.closeButton} onClick={onClose}>
                    닫기
                </button>
            </div>
        </div>
    );
};

export default BankSelection;
