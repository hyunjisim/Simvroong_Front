import React, { useState, useEffect } from 'react';
import styles from './post.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import heartFull from '../../img/Heart(red).png';
import heartEmpty from '../../img/Heart(empty).png';
import headimg from '../../img/head.jpg';
import axios from 'axios';

const PostPage = () => {
    const { taskId } = useParams();
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
    const [currentUserId, setCurrentUserId] = useState(null);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.get(`http://localhost:8080/order/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setCurrentUserId(response.data._id); // _id 설정
            console.log('현재 사용자 ID:', response.data._id);
            
            const data = response.data.data;
            setRequestData(data);
            setQuestions(data.QnA || []);
            setIsLiked(data.isLiked || false);
        } catch (error) {
            console.error('데이터 가져오기 실패:', error.response?.data || error.message);
            if (error.response?.status === 401) {
                alert('인증이 필요합니다. 로그인 페이지로 이동합니다.');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [taskId]);

    const toggleLike = async () => {
        const updatedLikeStatus = !isLiked;
        setIsLiked(updatedLikeStatus);
        try {
            const token = localStorage.getItem('authToken');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
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
            const token = localStorage.getItem('authToken');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
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
            const token = localStorage.getItem('authToken');
            const userId = localStorage.getItem('userMongoId');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
                {
                    action: 'addQuestion',
                    data: { content: newQuestion, userId },
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
            setNewQuestion('');
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
            const token = localStorage.getItem('authToken');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
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
            const token = localStorage.getItem('authToken');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
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
            const token = localStorage.getItem('authToken');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
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
            const token = localStorage.getItem('authToken');
            await axios.patch(
                `http://localhost:8080/order/${taskId}`,
                { action: 'deleteAnswer', questionId, answerId: replyId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchData();
        } catch (error) {
            console.error('답글 삭제 실패:', error);
            alert('답글 삭제에 실패했습니다.');
        }
    };

    if (loading) {
        return <div>데이터를 불러오는 중입니다...</div>;
    }

    return (
        <div className={styles.app}>
            <div className={styles.topBanner}>
                <button className={styles.backArrow} onClick={() => navigate(-1)}>
                    ←
                </button>
                <img src={headimg} alt="배경 이미지" className={styles.bannerImg} />
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
                {Array.isArray(questions) &&
                    questions.map((q) => (
                        <div key={q._id} className={styles.qnaItem}>
                            <div className={styles.question}>
                                <span>{q.question.userId || '익명 사용자'}:</span>
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
                                            <span>{r.userId || '익명 사용자'}:</span>
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
                <div className={styles.questionInput}>
                    <input
                        type="text"
                        placeholder="질문을 입력하세요..."
                        value={newQuestion}
                        onChange={(e) => setNewQuestion(e.target.value)}
                        className={styles.input}
                    />
                    <button onClick={addQuestion} className={styles.button}>
                        질문하기
                    </button>
                </div>
            </section>
        </div>
    );
};

export default PostPage;
