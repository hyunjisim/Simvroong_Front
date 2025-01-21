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
    const [userId,setUserId] = useState({})
    const [activeTab, setActiveTab] = useState("요구"); // 현재 활성화된 탭
    const [chatList, setChatList] = useState([]); // 채팅 목록 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태

    // 채팅 데이터 가져오기 함수
    const fetchChats = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            if (!token) throw new Error("토큰이 없습니다. 다시 로그인해주세요.");

            // const data = data //유저 아이디 가져와야함
            // const userId = data.userId
            const response = await axios.get('http://127.0.0.1:8080/chat', {
                headers: { Authorization: `Bearer ${token}` }
            });

            console.log(response.data.data);
            setChatList(response.data.data);
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

    return (
        <div className={styles.chatvroongcontainer}>
            {/* 헤더 */}
            <div className={styles.chatvroongheader}>
                <h3 className={styles.headerchatvroong}>챗 부릉</h3>
            </div>

            {/* 내용 */}
            <div className={styles.chatListContainer}>

                    <ul className={styles.chatList}>
                        {chatList.map((chat) => (
                            <li
                                key={chat.chatId}
                                className={styles.chatItem}
                                onClick={() => navigate(`/chat/${chat._id}`)}
                            >
                                {/* <img/> 채팅상대 프로필 이미지 */}
                                <img
                                    src={chat.otherUserPhotoUrl}
                                    alt="User Avatar"
                                    className={styles.chatImage}
                                />
                                <div className={styles.chatContent}>
                                    <h4 className={styles.chatTitle}>{chat.otherUserNickname}</h4>
                                    {/* <p className={styles.chatSubtitle}>{chat.location}</p> */}
                                    <p className={styles.chatMessage}>{chat.lastMessage}</p>
                                </div>
                                <span className={styles.chatTime}>
                                {new Date(chat.lastMessageTime).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </li>
                        ))}
                    </ul>
                
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
