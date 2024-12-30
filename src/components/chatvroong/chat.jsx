import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import io from "socket.io-client";
import panda from "../../img/panda.png";
import backb from "../../img/back-arrow.png";
import styles from "./chat.module.css";

// Socket.IO 서버 주소
const socket = io("http://127.0.0.1:8080");

const Chat = () => {
  const { chatId } = useParams(); // URL에서 chatId 가져오기
  const navigate = useNavigate();

  const [messages, setMessages] = useState([]); // 채팅 메시지
  const [newMessage, setNewMessage] = useState(""); // 새 메시지 입력값
  const [user, setUser] = useState({}); // 현재 사용자 정보
  const [chatPartner, setChatPartner] = useState({}); // 채팅 상대 정보

  // 채팅방 데이터 가져오기 및 Socket.IO 초기화
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    // Socket.IO 이벤트 설정
    socket.emit("joinRoom", { chatId, token });

    socket.on("roomData", (data) => {
      setMessages(data.messages);
      setUser(data.currentUser);
      setChatPartner(data.chatPartner);
    });

    socket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // 연결 해제 시 이벤트 제거
    return () => {
      socket.emit("leaveRoom", { chatId });
      socket.off();
    };
  }, [chatId, navigate]);

  // 메시지 보내기
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatId,
      userId: user.id,
      message: newMessage,
      timestamp: new Date().toISOString(),
    };

    socket.emit("sendMessage", messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setNewMessage(""); // 입력 필드 초기화
  };

  return (
    <div className={styles.chatContainer}>
      {/* 헤더 */}
      <div className={styles.header}>
        <img
          src={backb}
          alt="뒤로가기"
          className={styles.backb}
          onClick={() => navigate("/chat")}
        />
        <div className={styles.headerDetails}>
          <h3 className={styles.headerTitle}>{chatPartner.username}</h3>
          <span className={styles.responseTime}>보통 1시간 이내 응답</span>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.callButton}>📞</button>
          <button className={styles.moreButton}>⋮</button>
        </div>
      </div>

      {/* 거래 정보 */}
      <div className={styles.transactionSection}>
        <img src={chatPartner.profileImage || panda} alt="Thumbnail" className={styles.transactionImage} />
        <div className={styles.transactionText}>
          <p className={styles.transactionStatus}>거래 중</p>
          <p className={styles.transactionRequest}>집 앞 눈 좀 치워주세요</p>
          <p className={styles.transactionPrice}>20,000원</p>
        </div>
        <button className={styles.transactionButton}>거래완료</button>
      </div>

      {/* 메시지 */}
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.userId === user.id
                ? styles.messageRowRight
                : styles.messageRow
            }
          >
            {message.userId !== user.id && (
              <img
                src={chatPartner.profileImage || panda}
                alt="User Avatar"
                className={styles.messageAvatar}
              />
            )}
            <div
              className={
                message.userId === user.id
                  ? styles.messageBubbleRight
                  : styles.messageBubble
              }
            >
              {message.message}
            </div>
            <span
              className={
                message.userId === user.id
                  ? styles.messageTimeRight
                  : styles.messageTime
              }
            >
              {new Date(message.timestamp).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
        ))}
      </div>

      {/* 푸터 */}
      <footer className={styles.footer}>
        <div className={styles.inputSection}>
          <button className={styles.addButton}>+</button>
          <input
            type="text"
            placeholder="메시지 보내기"
            className={styles.messageInput}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className={styles.sendButton} onClick={handleSendMessage}>
            🐣
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Chat;
