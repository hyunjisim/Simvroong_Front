import React, { useState } from "react";
import styles from "./WarningBottomSheet.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅 가져오기

const WarningBottomSheet = ({ onClose, onConfirm,introduction,transport }) => {

    const navigate = useNavigate(); // 페이지 이동 함수

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckbox = () => setIsChecked(!isChecked);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("introduction", introduction);
        data.append("transport", transport);

        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                throw new Error('토큰이 없습니다.');
            }

            const response = await axios.post("http://localhost:8080/partnership/step5", data, {
                headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': `Bearer ${token}`,
                },
        })
        console.log(response.data);
        alert("제출 성공");

        // 성공 시 Step2 페이지로 이동
        navigate("/Profile");

        } catch (error) {
        console.error(error.response.data);
        alert("제출 실패");
        }
    }

    return (
    <div className={styles.bottomSheetOverlay}>
        <div className={styles.bottomSheet}>
            <h3 className={styles.title}>
            다음과 같은 활동은 계정이 정지될 수 있어요
            </h3>
            <ul className={styles.warningList}>
                <li>대리 처방을 하는 경우</li>
                <li>담배 배달을 요청하는 경우</li>
                <li>
                    주류 배달을 요청하는 경우
                    <br />
                    (단, 음식과 함께 총 금액 50% 이하로 가능)
                </li>
                <li>일반 자가용으로 여객 운송을 하는 경우</li>
                <li>무허가 자가용으로 이사·운반을 하는 경우</li>
            </ul>
            <div >
                <label className={styles.checklabel}>
                    <input 
                    className={styles.checkbox}
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckbox}
                    />
                    <span>내용을 확실하게 인지했어요</span>
                </label>
            </div>
            <div className={styles.buttongroup}>
                <button className={styles.closeButton} onClick={onClose}>
                    취소
                </button>
                <button className={styles.confirmButton} onClick={handleSubmit} disabled={!isChecked}>
                    완료
                </button>
            </div>
        </div>
    </div>
    );
};

export default WarningBottomSheet;
