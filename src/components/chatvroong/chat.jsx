import React, { useState, useEffect } from 'react';
import { data, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import panda from '../../img/panda.png';
import backb from '../../img/back-arrow.png';
import styles from './chat.module.css';
import axios from 'axios';

// Socket.IO 초기화
const socket = io('http://192.168.163.8:8080', {
    transports: ['websocket'], // WebSocket 연결 강제
    auth: { token: sessionStorage.getItem('authToken') },
});

const Chat = () => {
    const { channel } = useParams();
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [user, setUser] = useState({});
    const [chatPartner, setChatPartner] = useState({});
    const [loading, setLoading] = useState(true);
    const [requestData, setRequestData] = useState({});
    const [nickname, setNickname] = useState({});
    const [Channel,setChannel] = useState('');
    const [page, setPage] = useState(1); // 페이지 상태
    const [taskId,setTaskId] = useState(null);
    const [active,setActive] = useState({})
    // 상대방 닉네임은 내 현재로그인한 유저_id랑 상대 userid 이랑 비교해서 
    // 다르면 상대방으로 지정해서 해당 유저데이터에서 닉네임 불러오기
    // 게시물 사진 불러오기
    // 거래하기 버튼 누르기
    //게시물 제목 불러오기
    //게시물 거래 비용 불러오기

    // 게시물 데이터 가져오기
    useEffect(() => {
        fetchChat();
        fetchData();
        fetchActive();
        // fetchUser()
    }, [taskId,channel, navigate]);
    const fetchData = async () => {
            try {
                const token = sessionStorage.getItem('authToken');

                console.log('URL에서 추출된 channel:', channel);
                console.log(token);

                const response = await axios.get(
                    `http://192.168.163.8:8080/chat/${channel}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                

                const data = response.data;
                
                setTaskId(response.data.ChatData.taskId);
                setUser(response.data.mongo_id); //안씀
                setChatPartner(response.data.Nickname); //안씀
                // setNickname(nickname)

                setRequestData(data);//이거로 씀                
            } catch (error) {
                console.error('게시물 데이터를 가져오는 데 실패했습니다:', error.response?.data || error.message);
            } finally {
                setLoading(false);
            }
        };
        // // 유저 닉네임 패치
        // const fetchUser = async () => {
        //     try{
        //         const token = sessionStorage.getItem('authToken');
        //         const nickname = sessionStorage.getItem('nickname');
        //         const response = await axios.get(`http://192.168.163.8:8080/chat/${channel}`,
        //         {
        //             headers: { Authorization: `Bearer ${token}` },
        //         });
        //         console.log(response);
        //         setChatPartner(response.data.ChatPartner)
        //         setNickname(nickname)
        //         console.log('상대방 닉네임 : ',chatPartner,
        //             '현재 로그인 유저 닉네임 : ',nickname)
                
        //     } catch (error) {
        //         console.log('닉네임 정보 가져오기 실패 : ', error)
        //     }
        // }
        // 채팅내역 패치
        const fetchChat = async () => {
            try{
                const token = sessionStorage.getItem('authToken');
                // const nickname = sessionStorage.getItem('nickname')
                // console.log('nickname',nickname)
                // 이게 아니라 _id가 sender에 담겨서 가져와지니까 현재 유저_id랑 비교해야함
                const response = await axios.get(
                    `http://192.168.163.8:8080/chat/${channel}/message?page=${page}&limit=20`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                console.log('불러온 채팅 내역',response.data);
                setMessages(response.data.reverse() || []);
            } catch (error) {
                console.log('채팅 내역 가져오기 실패 : ', error)
            } finally {
                setLoading(false);
            }
        }
        const fetchActive = async () =>{
            try{
                const token = sessionStorage.getItem('authToken');
                if(taskId !== null){
                    const response = await axios.get(
                        `http://192.168.163.8:8080/chat/${channel}/completed/${taskId}`,
                        { headers: {Authorization: `Bearer ${token}`} }
                    )
                    console.log('불러온 거래 내역',response.data);
                    setActive(response.data);
                }
                return
            } catch (error) {
                console.log('신청상태 가져오기 실패 : ', error)
            } finally {
                setLoading(false);
            }
        }
        
    // 채팅 소켓 연결
    useEffect(() => {
        
        const token = sessionStorage.getItem('authToken');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }
        // 소켓 연결
        socket.auth = { token };
        socket.connect();
        // 2. 소켓을 통해 닉네임 채널 설정...
        socket.emit('setNickname', nickname)
        console.log('nickname',nickname);
        socket.emit('setChannel', channel)

        socket.emit('joinRoom', {channel,token});

        // 컴포넌트가 언마운트되거나 리렌더링될 때 방에서 나가기
        return () => {
            console.log(`채널 "${channel}"에서 나갑니다.`);
            socket.emit('leaveRoom', { channel });
        };
        
    }, [channel,nickname, messages, navigate]);

    useEffect(() => {
        const handleNewMessage = (message) => {
            console.log('수신한 메시지:', message);
            setMessages((prevMessages) => [...prevMessages, message]);
        };
    
        // 메시지 수신 리스너 등록
        socket.on('newMessage', handleNewMessage);
    
        // 기존 리스너 제거
        return () => {
            socket.off('newMessage', handleNewMessage);
        };
    }, [channel]); // channel이 변경될 때만 실행

    // 초기 스크롤 맨 아래로 설정
    useEffect(() => {
        const messagesContainer = document.querySelector(`.${styles.messagesContainer}`);
        if (messagesContainer) {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }, [messages]); // 메시지가 추가될 때마다 실행

    
    const handleSendMessage = () => {
        if (!newMessage.trim()) return;
    
        const messageData = {
            channel,
            userId: user, // 현재 사용자의 ID
            message: newMessage,
            timestamp: new Date().toISOString(),
            taskId: taskId
        };
        console.log("messageData", messageData);
    
        // 메시지 소켓으로 전송
        socket.emit('sendMessage', messageData);
    
        // 입력창 초기화
        setNewMessage('');
    };

    const handleisActive = async () => {
        try{
            const token = sessionStorage.getItem('authToken');
            console.log('handleisActive token : ',token);
            const response = await axios.post(
            `http://192.168.163.8:8080/chat/${channel}/completed`,
            { taskId },
            {
                'Content-Type': 'application/json',
                headers: { Authorization: `Bearer ${token}` }
            } 
        )
        console.log('신청 완료',response.data);
        
        } catch (error) {
            console.log('신청 실패 : ', error)
        }
    };
    
    // useEffect(() => {
    //     console.log('상태 업데이트 이후 active:', active.data.isActive);
    // }, [active]);

    if (loading) {
        return <div>로딩 중...</div>;
    }
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
                    {/* 아래 문장이 타이틀에 상대방 닉네임 가져오는거 */}
                    <h3 className={styles.headerTitle}>{requestData.Nickname || '알 수 없음'}</h3>
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
                    src={panda}
                    alt="Thumbnail"
                    className={styles.transactionImage}
                />
                <div className={styles.transactionText}>
                    <p className={styles.transactionStatus}>{requestData.ChatData?.transactionDetails.status || ''}</p>
                    <p className={styles.transactionRequest}>
                        {requestData.ChatData?.transactionDetails.title || '제목 없음'}
                    </p>
                    <p className={styles.transactionPrice}>
                        {requestData.ChatData?.transactionDetails.price
                            ? `${requestData.ChatData?.transactionDetails.price.toLocaleString()}원`
                            : '가격 미정'}
                    </p>
                </div>
                <button className={styles.transactionButton} onClick={handleisActive}>{'거래하기'}</button>
                {/* 기능 미완성 */}
            </div>

            {/* 메시지 리스트 */}
            <div className={styles.messagesContainer}>
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={
                            message.sender === user
                                ? styles.messageRowRight // 본인 메시지
                                : styles.messageRow // 상대방 메시지
                        }
                    >
                        {message.sender === user ? (
                            // 본인 메시지: 시간 왼쪽, 메시지 오른쪽
                            <>
                                <span className={styles.messageTimeLeft}>
                                    {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                                <div className={styles.messageBubbleRight}>
                                    {message.content}
                                </div>
                            </>
                        ) : (
                            // 상대방 메시지: 이미지 왼쪽, 메시지 오른쪽, 시간 오른쪽
                            <>
                                <img
                                    src={chatPartner.profileImage || panda}
                                    alt="User Avatar"
                                    className={styles.messageAvatar}
                                />
                                <div className={styles.messageNickname}>
                                    {requestData.Nickname || '알 수 없음'}
                                </div>
                                <div className={styles.messageBubble}>
                                    {message.content}
                                </div>
                                <span className={styles.messageTime}>
                                    {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </span>
                            </>
                        )}
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
