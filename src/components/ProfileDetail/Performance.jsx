import React, { useState } from "react";
import styles from "./Performance.module.css";
import BackButtonIcon from "../../img/partnerSignUp/back-button.png"

const Performance = () => {
    const [activeTab, setActiveTab] = useState("수행"); // 기본 활성 탭: 수행

    return (
        <div className={styles.container}>
            {/* 헤더영역 */}
            <div className={styles.header}>
                <div  className={styles.pagetitle}>
                    <img src={BackButtonIcon} alt="뒤로가기 버튼" className={styles.backbutton} />
                    <h2>수행 내역</h2>
                </div>
            </div>

            <div className={styles.content}>
                {/* 프로필 섹션 */}
                < div className="profilesection">
                    <div className={styles.profileimage}>
                        <img
                                src="https://via.placeholder.com/50"
                                alt="profile"
                                className={styles.profilePicture}
                            />
                    </div>

                    <div className={styles.profileinfo}>
                        <div className={styles.profilename}>
                            유딩꾸
                        </div>
                        <div className={styles.profiledetail}>
                            남성 · 20대
                        </div>
                    </div>
                </div>

                {/* 탭 메뉴 */}
                <div className={styles.tabmenu}>
                <div className={styles.tabs}>
                    <div
                    className={`${styles.tab} ${activeTab === "수행" ? styles.active : ""}`}
                    onClick={() => setActiveTab("수행")}
                    >
                    <p>수행</p> <span className={styles.tabCount}>2</span>
                    </div>
                    <div
                    className={`${styles.tab} ${activeTab === "리뷰" ? styles.active : ""}`}
                    onClick={() => setActiveTab("리뷰")}
                    >
                    <p>리뷰</p> <span className={styles.tabCount}>0</span>
                    </div>
                </div>
                <div className={styles.tabContent}>
                    {activeTab === "수행" && <div>수행 내용이 여기에 표시됩니다.</div>}
                    {activeTab === "리뷰" && <div>리뷰 내용이 여기에 표시됩니다.</div>}
                </div>
                </div>
            </div>
        </div>
    );
};

export default Performance;
