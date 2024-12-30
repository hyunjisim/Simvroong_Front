import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";
import sad from "../../img/sad.png";
import styles from "./ChatVroongNone.module.css";

const ChatVroongNone = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("요구");

    const main = () => navigate("/main");
    const vroonglist = () => navigate("/vroonglist");
    const chat = () => navigate("/chat");
    const profile = () => navigate("/profile");
    

    return (
        <div className={styles.chatvroongcontainer}>
            {/* 헤더 */}
            <div className={styles.chatvroongheader}>
                <h3 className={styles.headerchatvroong}>챗 부릉</h3>
            </div>

            {/* 요구 및 수행 */}
            <div className={styles.chatvroonglist}>
                <button
                    className={`${styles.chatvroongrequire} ${
                        activeTab === "요구" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("요구")}
                >
                    요구
                </button>
                <button
                    className={`${styles.chatvroongexecute} ${
                        activeTab === "수행" ? styles.active : ""
                    }`}
                    onClick={() => setActiveTab("수행")}
                >
                    수행
                </button>
            </div>

            {/* 내용 */}
            <div className={styles.chatListContainer}>
                <div className={styles.detail}>
                    <img src={sad} alt="슬픈 이모티콘" />
                    아직 채팅 내역이 없어요
                </div>
            </div>

            {/* 푸터 */}
            <footer className={styles.mainfooter}>
                <button onClick={main}>
                    <img src={Home_none} alt="홈" />
                    <span>홈</span>
                </button>
                <button onClick={vroonglist}>
                    <img src={Details_none} alt="이용내역" />
                    <span>이용내역</span>
                </button>
                <button onClick={chat}>
                    <img src={Chat_none} alt="채팅" />
                    <span>채팅</span>
                </button>
                <button onClick={profile}>
                    <img src={Profile_none} alt="내 정보" />
                    <span>내 정보</span>
                </button>
            </footer>
        </div>
    );
};

export default ChatVroongNone;
