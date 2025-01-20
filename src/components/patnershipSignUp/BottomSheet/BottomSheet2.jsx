import React from "react";
import styles from "./BottomSheet2.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅 가져오기

const BottomSheet2 = ({ onClose, bankName, accountNumber,accountHolder }) => {

    const navigate = useNavigate(); // 페이지 이동 함수

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit 실행됨");

        const data = {
            bankName,
            accountNumber,
            accountHolder,
        };
        
        console.log("제출 데이터:", data);


        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                throw new Error('토큰이 없습니다.');
            }

            const response = await axios.post("http://192.168.163.8:8080/partnership/step3", data, {
                headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`,
                },
        })
        console.log(response.data);
        alert("제출 성공");

        // 성공 시 Step2 페이지로 이동
        navigate("/partnership/Step4");

        } catch (error) {
            console.error("Error:", error.response ? error.response.data : error.message);
        alert("제출 실패");
        }
    }
    return (
        <div className={styles.bottomSheetOverlay}>
            {/* 제목 및 부제목 */}
            <div className={styles.header}>
                <h3 className={styles.title}>아래 계좌로 수익금을 정산할까요?</h3>
            </div>
            <p className={styles.subtitle}>올바른 계좌 정보만 정산이 가능해요.</p>

            {/* 계좌 정보 */}
            <div className={styles.accountInfo}>
                <div className={styles.bank}>
                    <p className={styles.bankLogo}>{bankName}</p>
                </div>
                <div className={styles.account}>
                <p className={styles.accountNumber}>{accountNumber}</p>
                </div>
            </div>

            {/* 버튼 영역 */}
            <div className={styles.buttonGroup}>
                <button className={styles.modifyButton} onClick={onClose}>
                    수정하기
                </button>
                <button className={styles.confirmButton} onClick={handleSubmit} >
                    네, 이상 없어요
                </button>
            </div>
        </div>
    );
};

export default BottomSheet2;
