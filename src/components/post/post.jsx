import React, { useState, useEffect } from 'react';
import styles from './post.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import heartFull from '../../img/Heart(red).png';
import heartEmpty from '../../img/Heart(empty).png';
import headimg from '../../img/head.jpg';
import axios from 'axios';


const PostPage = () => {
    
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState({});
    const [isLiked, setIsLiked] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [newQuestion, setNewQuestion] = useState('');
    const [loading, setLoading] = useState(true);
    const [editingQuestionId, setEditingQuestionId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [replyingToQuestionId, setReplyingToQuestionId] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [editingReply, setEditingReply] = useState(null);
    const [updatedReplyContent, setUpdatedReplyContent] = useState('');
    const [showQuestionInput, setShowQuestionInput] = useState(false);
    const {taskId} = useParams()
    const [taskid, setTaskid] = useState(null);         // URL에서 가져옴
    const [userId, setUserId] = useState(null);          // 심부름 게시물의 작성자 ID
    const [currentUserId, setCurrentUserId] = useState(null); // 현재 로그인한 사용자 ID

    const fetchData = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            const response = await axios.get(`http://192.168.163.8:8080/order/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = response.data.data;
            console.log(data)

            setTaskid(data.taskId) //심부름 게시물 taskid 설정
            // console.log(data.taskId);
            setUserId(data.user_id); // 심부름 게시물 작성자 ID 설정
            // console.log(data.user_id);
            setCurrentUserId(response.data.currentUser); // 현재 로그인된 사용자 ID 설정
            // console.log(response.data.currentUser);
            // console.log(response.data);
            console.log(data.photoUrl)


            setRequestData(data);
            setQuestions(data.QnA || []);
        } catch (error) {
            console.error('데이터 가져오기 실패:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                    
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };
    const fetchLike = async () => {
        try {
            const token = sessionStorage.getItem('authToken');
            // 좋아요 상태를 확인하는 API 요청
            const response = await axios.post(`http://192.168.163.8:8080/order/${taskId}`, 
            {},
            {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('a',response)
            // 서버 응답에서 isLiked 상태를 추출하여 설정
            if (response.data.data.isLiked !== undefined) {
                setIsLiked(response.data.data.isLiked);
                console.log('좋아요 상태:', response.data.data.isLiked); // 상태 확인 로그
            } else {
                console.error('서버 응답에 좋아요 상태가 포함되지 않았습니다.');
            }
        } catch (error) {
            console.error('좋아요 상태를 가져오는 중 오류 발생:', error);
        }
    };

    useEffect(() => {
        fetchData();
        fetchLike();
    }, []);

    const toggleLike = async () => {
        const updatedLikeStatus = !isLiked;
        setIsLiked(updatedLikeStatus);
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                { action: updatedLikeStatus ? 'addFavorite' : 'removeFavorite' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
        } catch (error) {
            console.error('좋아요 상태 저장 실패:', error);
            alert('좋아요 상태를 저장하지 못했습니다.');
            setIsLiked(!updatedLikeStatus);
        }
    };

    const handleEditReply = (questionId, reply) => {
        setEditingReply({ questionId, replyId: reply._id });
        setUpdatedReplyContent(reply.content);
    };

    const handleReplyInput = (questionId) => {
        setReplyingToQuestionId(questionId);
        setReplyContent('');
    };

    const submitReply = async (questionId) => {
        if (!replyContent.trim()) {
            alert('답글 내용을 입력해주세요.');
            return;
        }
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                {
                    action: 'addAnswer',
                    questionId,
                    data: { content: replyContent },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
            setReplyContent('');
            setReplyingToQuestionId(null);
        } catch (error) {
            console.error('답글 추가 실패:', error);
            alert('답글 추가에 실패했습니다.');
        }
    };

    const addQuestion = async () => {
        if (newQuestion.trim() === '') return;
        try {
            const token = sessionStorage.getItem('authToken');
            const userId = sessionStorage.getItem('userMongoId');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                {
                    action: 'addQuestion',
                    data: { content: newQuestion, userId },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            fetchData();
            setNewQuestion('');
            setShowQuestionInput(false); // 입력창 숨김
        } catch (error) {
            console.error('질문 추가 실패:', error);
            alert('질문 추가에 실패했습니다.');
        }
    };

    const updateQuestion = async (questionId, updatedContent) => {
        if (!updatedContent.trim()) {
            alert('수정된 내용을 입력해주세요.');
            return;
        }
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                {
                    action: 'updateQuestion',
                    questionId,
                    data: { content: updatedContent },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
            setEditingQuestionId(null);
            setEditedContent('');
        } catch (error) {
            console.error('질문 수정 실패:', error);
            alert('질문 수정에 실패했습니다.');
        }
    };

    const deleteQuestion = async (questionId) => {
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                { action: 'deleteQuestion', questionId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (error) {
            console.error('질문 삭제 실패:', error);
            alert('질문 삭제에 실패했습니다.');
        }
    };

    const updateReply = async () => {
        if (!updatedReplyContent.trim()) {
            alert('수정된 내용을 입력해주세요.');
            return;
        }
        try {
            const { questionId, replyId } = editingReply;
            const token = sessionStorage.getItem('authToken');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                {
                    action: 'updateAnswer',
                    questionId,
                    answerId: replyId,
                    data: { content: updatedReplyContent },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
            setEditingReply(null);
            setUpdatedReplyContent('');
        } catch (error) {
            console.error('답글 수정 실패:', error);
            alert('답글 수정에 실패했습니다.');
        }
    };

    const deleteReply = async (questionId, replyId) => {
        try {
            const token = sessionStorage.getItem('authToken');
            await axios.patch(
                `http://192.168.163.8:8080/order/${taskId}`,
                { action: 'deleteAnswer', questionId, answerId: replyId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (error) {
            console.error('답글 삭제 실패:', error);
            alert('답글 삭제에 실패했습니다.');
        }
    };

    const handleTaskAccept = async () => {
        try {
            const token = sessionStorage.getItem("authToken");
            // 심부름 생성 요청
            const response = await axios.post(
                `http://192.168.163.8:8080/check/agree/${taskId}`,
                { taskId, message: '심부름 신청하겠습니다' }, // 게시물 ID 전달
                {
                headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(token)
            fetchData();
            
            } catch (error) {
            alert("심부름 신청 실패",error)
            console.log(error);
            }
        };
    // 채팅 채널 만들기
    const handleCreateChannel = async () => {
        try{
            const token = sessionStorage.getItem('authToken');
            const channel = `${taskId}_${userId}_${currentUserId}`


            console.log('전달 데이터:', { taskId, userId, currentUserId, channel });

            const response = await axios.post(
                `http://192.168.163.8:8080/chat/${channel}`,
                {
                    channel,message: `채널명 : ${channel}`,
                    taskId,
                    userId,
                    currentUserId,
                },
                {
                    'Content-Type': 'application/json',
                    headers: { Authorization: `Bearer ${token}` },
                }
            )

            // 스키마에 기본값 거래중으로 둬야함
            // socket.emit('setChannel : ',channel,'token : ',token)
            // // 응답 데이터 확인
            console.log("서버 응답:", response.data);

            if (!response.data || !response.data.data || !response.data.data._id) {
                throw new Error('유효하지 않은 응답 데이터');
            }

            // 채팅방을 만들고 조인룸을 하면서 채널과 태스크아이디,현재유저아이디를 보낸다
            //게시물 데이터는 taskid로 백엔드에서 찾아서 프론트에 넘긴다
            const channelId = response.data.data._id;
            // const Chatroom = response.data.data.Chatroom
            navigate(`/chat/${channelId}`)
            //이러고 백엔드에서 보낼때는 _id를 암호화해서 보낸다
            //백엔드에 어쓰컨트롤러에 8번째 줄
        } catch (error) {
            console.log("채팅 채널 만들기 실패:",error);
        }
    }

    if (loading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className={styles.app}>
            <div className={styles.topBanner}>
                <button className={styles.backArrow} onClick={() => navigate(-1)}>
                    ←
                </button>
                <img src={requestData.thumnail||headimg} alt="배경 이미지" className={styles.bannerImg} />
            </div>
            <header className={styles.header}>
                <img src={requestData.photoUrl} alt="프로필" className={styles.profileImg} />
                <div className={styles.userInfo}>
                    <span className={styles.userName}>{requestData.nickname || '익명 사용자'}</span>
                    <span className={styles.userDistance}>{requestData.location.area || '익명 사용자'}</span>
                </div>
                <button className={styles.likeBtn} onClick={toggleLike}>
                    <img src={isLiked ? heartFull : heartEmpty} alt="찜 버튼" className={styles.likeIcon} />
                </button>
            </header>
            <main className={styles.content}>
                <h3>{requestData.title || '제목 없음'}</h3>
                <p>{requestData.description || '내용 없음'}</p>
                <p>금액: {requestData.payment?.serviceFee || 0} 원</p>
            </main>
            <section className={styles.qna}>
                <h3>Q&A</h3>
                <button
                className={styles.qbutton}
                onClick={() => setShowQuestionInput(true)} // 입력창 표시
            >
                질문하기
            </button>
            {showQuestionInput && (
                <div className={styles.questionInput}>
                    <input
                        type="text"
                        placeholder="질문을 입력하세요..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={addQuestion} className={styles.button}>
                        확인
                    </button>
                    <button
                        onClick={() => setShowQuestionInput(false)} // 입력창 숨김
                        className={styles.button}
                    >
                        취소
                    </button>
                </div>
            )}
                {Array.isArray(questions) &&
                    questions.map((q) => 
                        (
                        console.log(q),
                        <div key={q._id} className={styles.qnaItem}>
                            <div className={styles.question}>
                                <span><img src={q.question.photoUrl} className={styles.QnAImg}/>{q.question.nickname || '익명'}:</span>
                                {editingQuestionId === q._id ? (
                                    <div>
                                        <input
                                            type="text"
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            className={styles.input}
                                        />
                                        <button
                                            onClick={() => updateQuestion(q._id, editedContent)}
                                            className={styles.button}
                                        >
                                            수정 완료
                                        </button>
                                        <button
                                            onClick={() => setEditingQuestionId(null)}
                                            className={styles.button}
                                        >
                                            취소
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <p>{q.question.content}</p>
                                        {currentUserId === q.question.userId && (
                                            <>
                                                <button
                                                    onClick={() => {
                                                        setEditingQuestionId(q._id);
                                                        setEditedContent(q.question.content);
                                                    }}
                                                    className={styles.button}
                                                >
                                                    질문 수정
                                                </button>
                                                <button
                                                    onClick={() => deleteQuestion(q._id)}
                                                    className={styles.button}
                                                >
                                                    질문 삭제
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                                <button onClick={() => handleReplyInput(q._id)} className={styles.button}>
                                    답글 달기
                                </button>
                            </div>
                            {q.answers.map((r) => (
                                <div key={r._id} className={styles.reply}>
                                    {editingReply && editingReply.replyId === r._id ? (
                                        <div className={styles.replyEdit}>
                                            <input
                                                type="text"
                                                value={updatedReplyContent}
                                                onChange={(e) => setUpdatedReplyContent(e.target.value)}
                                                className={styles.input}
                                            />
                                            <button onClick={updateReply} className={styles.button}>
                                                수정 완료
                                            </button>
                                            <button
                                                onClick={() => setEditingReply(null)}
                                                className={styles.button}
                                            >
                                                취소
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.replyView}>
                                            <span><img src={r.photoUrl} className={styles.QnAImg}/>{r.nickname || '익명 사용자'}:</span>
                                            <p>{r.content}</p>
                                            {currentUserId === r.userId && (
                                                <>
                                                    <button
                                                        onClick={() => handleEditReply(q._id, r)}
                                                        className={styles.button}
                                                    >
                                                        답글 수정
                                                    </button>
                                                    <button
                                                        onClick={() => deleteReply(q._id, r._id)}
                                                        className={styles.button}
                                                    >
                                                        답글 삭제
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {replyingToQuestionId === q._id && (
                                <div className={styles.replyInput}>
                                    <input
                                        type="text"
                                        placeholder="답글을 입력하세요..."
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className={styles.input}
                                    />
                                    <button
                                        onClick={() => submitReply(q._id)}
                                        className={styles.button}
                                    >
                                        보내기
                                    </button>
                                    <button
                                        onClick={() => setReplyingToQuestionId(null)}
                                        className={styles.button}
                                    >
                                        취소
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
            </section>
            <footer className={styles.footer}>
                <button className={styles.acceptButton} onClick={handleCreateChannel}>
                    심부름 하기
                </button>
            </footer>
        </div>
    );
};

export default PostPage;
