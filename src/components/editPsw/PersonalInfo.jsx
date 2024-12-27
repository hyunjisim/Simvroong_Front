import React, { useState } from "react";
import styles from './PersonalInfo.module.css';
import backb from "../../img/back-arrow.png";
import panda from '../../img/panda.png';
import logo from '../../img/simvroong.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PersonalInfo = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(""); // 입력한 비밀번호
    const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // 비밀번호 확인 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault(); // 기본 동작 방지
        if (!password) {
            setErrorMessage("비밀번호를 입력해주세요.");
            return;
        }

        setIsLoading(true); // 로딩 시작
        try {
            const token = localStorage.getItem('authToken')
            // 서버로 비밀번호 검증 요청
            const response = await axios.post(
                "http://127.0.0.1:8080/auth/verify-password",
                { password },
                {
                  headers: {
                    "Authorization": `Bearer ${token}`,
                  },
                }
              );

            if (response.status === 200 && response.data.success) {
                alert("비밀번호가 일치합니다. 회원 정보 수정 페이지로 넘어갑니다.");
                navigate("/editProfile"); // 회원 정보 수정 페이지로 이동
            } else {
                setErrorMessage("입력하신 비밀번호가 맞지 않습니다. 다시 확인해주세요.");
            }
        } catch (error) {
            console.error("비밀번호 검증 오류:", error);
            setErrorMessage("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.header}>
                <img src={backb} alt="뒤로가기" className={styles.backIcon} onClick={() => navigate('/profile')} />
                <img src={logo} alt="심부릉" className={styles.logo} />
            </div>
            <h3 className={styles.title}>회원 정보 조회 및 수정</h3>

            {/* 유저 정보 */}
            <div className={styles.userInfo}>
                <img src={panda} alt="유저 이미지" className={styles.userImage} />
                <span className={styles.userName}>유딩뀨</span>
            </div>

            {/* 개인정보 변경 */}
            <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle}>개인정보변경</div>
                <p className={styles.description}>고객님의 개인정보 보호를 위해 최선을 다하겠습니다</p>
            </div>
            <p className={styles.descriptionStrong}>고객님의 개인정보 보호를 위해 본인확인을 진행합니다.</p>
            <p className={styles.descriptionStrong}>
                <span className={styles.strong}>심부릉 비밀번호를 입력해주세요</span>
            </p>

            {/* 패스워드 확인 */}
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <label htmlFor="password" className={styles.inputLabel}>비밀번호 확인</label>
                    <input
                        type="password"
                        id="password"
                        placeholder=""
                        value={password}
                        onChange={handlePasswordChange}
                        className={styles.input} />
                    <button type="submit" className={styles.button} disabled={isLoading}>
                        {isLoading ? "확인 중..." : "확인"}
                    </button>
                </div>
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default PersonalInfo;
