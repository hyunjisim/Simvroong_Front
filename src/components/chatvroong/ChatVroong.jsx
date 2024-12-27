import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";
import panda from "../../img/panda.png";
import styles from "./ChatVroong.module.css";

//부릉 리스트
const ChatVroong = () => {
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
                <h3 className={styles.headerchatvroong}>챗부릉</h3>
            </div>

            {/* 요구 및 수행 */} 
            <div className={styles.chatvroonglist}>
                {/* 요구 */}
                <div className={styles.requiree}>
                <button className={`${styles.chatvroongrequire} 
                ${activeTab === "요구" ? styles.active : ""}`}
                    onClick={() => setActiveTab("요구")}>
                    요구
                </button>
                </div>
                {/* 수행 */}
                <div className={styles.executee}>
                <button className={`${styles.chatvroongexecute} 
                ${activeTab === "수행" ? styles.active : ""}`}
                    onClick={() => setActiveTab("수행")}>
                    수행
                </button>
                </div>
            </div>

            {/* 내용 */}
            <div className={styles.chatListContainer}>
                    <ul className={styles.chatList}>
                        {/* 챗 리스트 */}
                        <li className={styles.chatItem}>
                            <img src={panda} alt="붕어빵" className={styles.chatImage} />
                            <div className={styles.chatContent}>
                                <h4 className={styles.chatTitle}>붕어일찬</h4>
                                <p className={styles.chatSubtitle}>성남시 1시간 전</p>
                                <p className={styles.chatMessage}>앗 제가 바보여서.. 죄송합니다</p>
                            </div>
                        </li>
                        {/* 챗 리스트 */}
                        <li className={styles.chatItem}>
                            <img src={panda} alt="유딩뀨" className={styles.chatImage} />
                            <div className={styles.chatContent}>
                                <h4 className={styles.chatTitle}>유딩뀨</h4>
                                <p className={styles.chatSubtitle}>동작구 3일 전</p>
                                <p className={styles.chatMessage}>감사합니다</p>
                            </div>
                        </li>
                    </ul>
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
export default ChatVroong;