import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chat_none from "../../img/footer/Chat-none-color.png";
import Details_none from "../../img/footer/Details-none-color.png";
import Home_none from "../../img/footer/Home-none-color.png";
import Profile_none from "../../img/footer/Profile-none-color.png";
import panda from "../../img/panda.png";
import sad from "../../img/sad.png";
import styles from "./ChatVroong.module.css";
import axios from "axios";

const ChatVroong = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("요구"); // 현재 활성화된 탭
    const [chatList, setChatList] = useState([]); // 채팅 목록 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 채팅 데이터 가져오기 함수
    const fetchChats = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            if (!token) throw new Error("토큰이 없습니다. 다시 로그인해주세요.");

            const endpoint =
                activeTab === "요구"
                    ? "http://127.0.0.1:8080/chats/request"
                    : "http://127.0.0.1:8080/chats/perform";

            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setChatList(response.data);
        } catch (error) {
            console.error("채팅 데이터 불러오기 실패:", error);
            setChatList([]); // 실패 시 빈 배열 설정
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchChats();
    }, [activeTab]); // activeTab 변경 시 데이터 재요청

    // 탭 변경 핸들러
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

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
                    onClick={() => handleTabChange("요구")}
                >
                    요구
                </button>
                <button
                    className={`${styles.chatvroongexecute} ${
                        activeTab === "수행" ? styles.active : ""
                    }`}
                    onClick={() => handleTabChange("수행")}
                >
                    수행
                </button>
            </div>

            {/* 내용 */}
            <div className={styles.chatListContainer}>
                {loading ? (
                    <div>로딩 중입니다...</div>
                ) : chatList.length === 0 ? (
                    <div className={styles.detail}>
                        <img src={sad} alt="슬픈 이모티콘" />
                        아직 {activeTab === "요구" ? "요구" : "수행"} 채팅 내역이 없습니다.
                    </div>
                ) : (
                    <ul className={styles.chatList}>
                        {chatList.map((chat) => (
                            <li
                                key={chat.chatId}
                                className={styles.chatItem}
                                onClick={() => navigate(`/chatroom/${chat.chatId}`)}
                            >
                                <img
                                    src={chat.user.profileImage}
                                    alt={`${chat.user.username} 프로필 이미지`}
                                    className={styles.chatImage}
                                />
                                <div className={styles.chatContent}>
                                    <h4 className={styles.chatTitle}>{chat.user.username}</h4>
                                    <p className={styles.chatSubtitle}>{chat.location}</p>
                                    <p className={styles.chatMessage}>{chat.lastMessage}</p>
                                </div>
                                <span className={styles.chatTime}>{chat.lastMessageTime}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* 푸터 */}
            <footer className={styles.mainfooter}>
                <button onClick={() => navigate("/main")}>
                    <img src={Home_none} alt="홈" />
                    <span>홈</span>
                </button>
                <button onClick={() => navigate("/vroonglist")}>
                    <img src={Details_none} alt="이용내역" />
                    <span>이용내역</span>
                </button>
                <button onClick={() => navigate("/chat")}>
                    <img src={Chat_none} alt="채팅" />
                    <span>채팅</span>
                </button>
                <button onClick={() => navigate("/profile")}>
                    <img src={Profile_none} alt="내 정보" />
                    <span>내 정보</span>
                </button>
            </footer>
        </div>
    );
};

export default ChatVroong;
