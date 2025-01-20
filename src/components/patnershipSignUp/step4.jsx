import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅 가져오기
import styles from "./step4.module.css";
import BottomSheet from "./BottomSheet/step4Bottomsheet"; // 바텀시트 컴포넌트 import
import BackButtonIcon from "../../img/partnerSignUp/back-button.png";

const PartnershipStep4 = () => {

    const navigate = useNavigate(); // 페이지 이동 함수

    const [errands, setErrands] = useState([]); // 선택된 심부름 카테고리 리스트
    const [isSheetOpen, setIsSheetOpen] = useState(false); // 바텀시트 열림 상태

    // 심부름 카테고리 추가
    const handleSelectErrand = (errand) => {
        if (!errands.includes(errand)) {
        setErrands([...errands, errand]);
        }
        setIsSheetOpen(false); // 바텀시트 닫기
    };

    // 심부름 카테고리 삭제
    const handleRemoveErrand = (errand) => {
        setErrands(errands.filter((item) => item !== errand));
    };

    // 다음 버튼 클릭 시 DB로 데이터 전송
    const handleSubmit = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            if (!token) {
                throw new Error('토큰이 없습니다.');
            }
            const response = await axios.post("http://192.168.163.8:8080/partnership/Step4",{ services: errands }, {
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                    },
            });
            console.log("전송할 심부름 데이터:", errands);

            console.log(response.data);
            alert("제출 성공");

            // 성공 시 Step5 페이지로 이동
            navigate("/partnership/Step5");

            } catch (error) {
                console.error(error.response?.data || error.message);
                alert(error.response?.data?.error || "제출 실패");
            }
    };

    return (
        <section className={styles.container}>
            {/* 헤더 섹션 */}
            <div className={styles.header}>
                <div className={styles.pagetitle}>
                    <img src={BackButtonIcon} alt="뒤로가기 버튼" className={styles.backbutton} />
                    <h2>심부름</h2>
                </div>
                {/* 단계 표시 바 */}
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={styles.step}></div>
                </div>
            </div>

        {/* 입력 폼 */}
        <div className={styles.content}>
            <form className={styles.errandForm}>
                <p className={styles.titletext}>수행 가능한 심부름을<br />모두 선택해 주세요</p>
                <p className={styles.subtext}>수행가능한 심부름을 등록할 시 의뢰 성사 가능성이 높아져요.</p>

                <div className={styles.inputgroup}>
                    <input
                    type="text"
                    placeholder="심부름 검색"
                    readOnly
                    onClick={() => setIsSheetOpen(true)} // 바텀시트 열기
                    className={styles.inputField}
                    />
                </div>

                {/* 선택된 심부름 카테고리 리스트 */}
                <div className={styles.errandList}>
                    {errands.map((errand, index) => (
                    <div key={index} className={styles.errandItem}>
                        {errand}
                        <span
                        className={styles.removeButton}
                        onClick={() => handleRemoveErrand(errand)}
                        >
                        X
                        </span>
                    </div>
                    ))}
                </div>

                <button
                    type="button"
                    className={styles.submitButton}
                    onClick={handleSubmit}
                >
                    다음
                </button>
            </form>
        </div>

        {/* 바텀시트 */}
        {isSheetOpen && (
            <BottomSheet
            onClose={() => setIsSheetOpen(false)}
            onSelect={handleSelectErrand}
            />
        )}
        </section>
    );
};

export default PartnershipStep4;
