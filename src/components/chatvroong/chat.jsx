import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import panda from '../../img/panda.png';
import backb from '../../img/back-arrow.png';
import styles from './chat.module.css';
import axios from 'axios';

// Socket.IO 초기화
const socket = io('http://127.0.0.1:8080', {
    auth: { token: sessionStorage.getItem('authToken') },
});

const Chat = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState({});
    const [chatPartner, setChatPartner] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestData, setRequestData] = useState({});

    // 게시물 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken');

                const response = await axios.get(`http://127.0.0.1:8080/order/${taskId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = response.data.data;
                // const user = response.user._id
                console.log("data",data);
                setRequestData(data);
                
            } catch (error) {
                console.error('게시물 데이터를 가져오는 데 실패했습니다:', error.response?.data || error.message);
                if (error.response?.status === 401) {
                    alert('인증이 필요합니다. 로그인 페이지로 이동합니다.');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [taskId, navigate]);

    // 채팅 소켓 연결
    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        console.log(taskId);
        socket.emit('joinRoom', { taskId, token });

        socket.on('roomData', (data) => {
            setMessages(data.messages);
            setUser(data.currentUser);
            setChatPartner(data.chatPartner);
        });

        socket.on('newMessage', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.emit('leaveRoom', { taskId });
            socket.off();
        };
    }, [taskId, navigate]);

    // 메시지 전송 핸들러
    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const messageData = {
            taskId,
            userId: user, // 현재 사용자의 ID
            message: newMessage,
            timestamp: new Date().toISOString(),
        };
        console.log("messageData",messageData);

        socket.emit('sendMessage', messageData);
        setMessages((prevMessages) => [...prevMessages, messageData]);
        setNewMessage('');
    };

    return (
        <div className={styles.chatContainer}>
            {/* 헤더 */}
            <div className={styles.header}>
                <img
                    src={backb}
                    alt="뒤로가기"
                    className={styles.backb}
                    onClick={() => navigate('/chat')}
                />
                <div className={styles.headerDetails}>
                    <h3 className={styles.headerTitle}>{chatPartner.nickname || '알 수 없음'}</h3>
                    <span className={styles.responseTime}>보통 1시간 이내 응답</span>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.callButton}>전화</button>
                    <button className={styles.moreButton}>⋮</button>
                </div>
            </div>

            {/* 거래 정보 */}
            <div className={styles.transactionSection}>
                <img
                    src={requestData.imageUrl || panda}
                    alt="Thumbnail"
                    className={styles.transactionImage}
                />
                <div className={styles.transactionText}>
                    <p className={styles.transactionStatus}>거래 중</p>
                    <p className={styles.transactionRequest}>
                        {requestData.title || '제목 없음'}
                    </p>
                    <p className={styles.transactionPrice}>
                        {requestData.payment?.serviceFee
                            ? `${requestData.payment.serviceFee.toLocaleString()}원`
                            : '가격 미정'}
                    </p>
                </div>
                <button className={styles.transactionButton}>거래 완료</button>
            </div>

            {/* 메시지 리스트 */}
            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.fromUserId === user.id
                                ? styles.messageRowRight
                                : styles.messageRow
                        }
                    >
                        {message.fromUserId !== user.id && (
                            <img
                                src={chatPartner.profileImage || panda}
                                alt="User Avatar"
                                className={styles.messageAvatar}
                            />
                        )}
                        <div
                            className={
                                message.fromUserId === user.id
                                    ? styles.messageBubbleRight
                                    : styles.messageBubble
                            }
                        >
                            {message.message}
                        </div>
                        <span
                            className={
                                message.fromUserId === user.id
                                    ? styles.messageTimeRight
                                    : styles.messageTime
                            }
                        >
                            {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                        </span>
                    </div>
                ))}
            </div>

            {/* 입력창 */}
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
                        전송
                    </button>
                </div>
            </footer>
        </div>
    );
};

export default Chat;
