import React, { useState } from 'react';
import './post.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import panda from '../../img/panda.png';
import heartFull from '../../img/Heart(red).png';
import heartEmpty from '../../img/Heart(empty).png';
import headimg from '../../img/head.jpg'

const PostPage = () => {
  const navigate = useNavigate(); // navigate 함수 사용
  const [isLiked, setIsLiked] = useState(false);
  const [questions, setQuestions] = useState([
    { id: 1, user: '유저2', text: '코드만 작성해서 드리면 되는건가요?', replies: [] },
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newReply, setNewReply] = useState('');

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const addQuestion = () => {
    if (newQuestion.trim() !== '') {
      setQuestions([...questions, { id: Date.now(), user: '나', text: newQuestion, replies: [] }]);
      setNewQuestion('');
    }
  };

  const addReply = (id) => {
    if (newReply.trim() !== '') {
      setQuestions(
        questions.map((q) =>
          q.id === id ? { ...q, replies: [...q.replies, { user: '의뢰인', text: newReply }] } : q
        )
      );
      setNewReply('');
    }
  };

  // 뒤로가기 버튼 클릭 시 실행될 함수
  const handleBackClick = () => {
    navigate(-1); // 이전 페이지로 이동
    // 또는 특정 경로로 이동하고 싶다면: navigate('/target-route');
  };

  return (
    <div className="app">
      <div className="top-banner">
        <button className="back-arrow" onClick={handleBackClick}>←</button>
        <img
          src={headimg}
          alt="배경 이미지"
          className="banner-img"
        />
      </div>

      <header className="header">
        <img src={panda} alt="프로필" className="profile-img" />
        <div className="user-info">
          <span className="user-name">유저1</span>
          <span className="user-distance">1km 내외</span>
        </div>
        {/* 찜 버튼 */}
        <button className="like-btn" onClick={toggleLike}>
          <img
            src={isLiked ? heartFull : heartEmpty}
            alt="찜 버튼"
            className="like-icon"
          />
        </button>
        <button className="more-btn">•••</button>
      </header>

      <main className="content">
        <h3>요청사항</h3>
        <p>AI 개발자 공부 중인데 Front-end 클론 코딩 과제가 있어요. 도와주세요!</p>
      </main>

      <section className="qna">
        <h3>Q&A</h3>
        {questions.map((q) => (
          <div key={q.id} className="qna-item">
            <div className="question">
              <span>{q.user}:</span>
              <p>{q.text}</p>
            </div>
            {q.replies.map((r, index) => (
              <div key={index} className="reply">
                <span>[{r.user}]</span>
                <p>{r.text}</p>
              </div>
            ))}
            <div className="reply-input">
              <input
                type="text"
                placeholder="답글 작성..."
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
              />
              <button onClick={() => addReply(q.id)}>댓글 달기</button>
            </div>
          </div>
        ))}

        <div className="question-input">
          <input
            type="text"
            placeholder="질문을 입력하세요..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
          />
          <button onClick={addQuestion}>질문하기</button>
        </div>
      </section>

      <footer>
        <button className="submit-btn">심부름 하기</button>
      </footer>
    </div>
  );
};

export default PostPage;
