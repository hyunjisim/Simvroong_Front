import './list.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Sleep from '../../img/sleep.png';
import Cycle from '../../img/cycle.png';
import Nerv from '../../img/nerv.png';
import Chat_color from '../../img/footer/Chat-color.png';
import Details_color from '../../img/footer/Details-color.png';
import Home_color from '../../img/footer/Home-color.png';
import Profile_color from '../../img/footer/Profile-color.png';
import Chat_none from '../../img/footer/Chat-none-color.png';
import Details_none from '../../img/footer/Details-none-color.png';
import Home_none from '../../img/footer/Home-none-color.png';
import Profile_none from '../../img/footer/Profile-none-color.png';
import Sad from '../../img/sad.png';
// bureung
const VroongList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');

  const [vroongList, setVroongList] = useState([ // 이건 화면 어떻게 나오는지 확인하기 위한 예시
    { id: 1, title: '편의점 과자 부릉좀 해주세요', location: '동작구 사당제1동', time: '3일 전', price: '10,000원', tag: '완료', image: Sleep },
    { id: 2, title: '카페 부릉', location: '동작구 사당제1동', time: '하루 전', price: '20,000원', tag: '진행중', image: Cycle },
    { id: 3, title: '쓰레기 부릉', location: '동작구 사당제1동', time: '한달 전', price: '20,000원', tag: '취소완료', image: Nerv },
  ]);

  // 이 부분 백엔드 연결을 위해 만들어 놈
   // 백엔드에서 데이터를 가져오는 함수
  //  const fetchVroongList = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/vroongList'); // 백엔드 API URL
  //     setVroongList(response.data); // 받아온 데이터를 상태에 저장
  //   } catch (error) {
  //     console.error('데이터를 가져오는 중 오류 발생:', error);
  //   }
  // };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  // useEffect(() => {
  //   fetchVroongList();
  // }, []);

  const handleFooterClick = (tab) => {
    setActiveTab(tab); 
    navigate(`/${tab}`);
  };

  return (
    <div className="vroong-container">
      <header className="vroong-header">
        <h1>부릉 리스트</h1>
      </header>

      <main className="vroong-main">
        {vroongList.length === 0 ? (
          <div className="empty-state">
            <img src={Sad} alt="슬픈 이모티콘" />
            <p>이용 내역이 없어요</p>
          </div>
        ) : (
          vroongList.map((item) => (
            <div key={item.id} className="vroong-item">
              <img src={item.image} alt={item.title} className="vroong-image" />
              <div className="vroong-content">
                <span className={`vroong-tag ${item.tag}`}>{item.tag}</span>
                <h3>{item.title}</h3>
                <p className="location-time">
                    <span>{item.location}</span>
                    <span>{item.time}</span>
                </p>
                <div className="price-review">
                    <p className="vroong-price">{item.price}</p>
                    {item.tag === '완료' && (
                        <button className="review-btn">후기 보내기</button>
                    )}
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <footer className="vroong-footer">
        <button onClick={() => handleFooterClick('home')}>
          <img src={activeTab === 'home' ? Home_color : Home_none} alt="홈" />
          <span className={activeTab === 'home' ? 'active-tab' : ''}>홈</span>
        </button>
        <button onClick={() => handleFooterClick('main')}>
          <img src={activeTab === 'details' ? Details_color : Details_none} alt="이용 내역" />
          <span className={activeTab === 'details' ? 'active-tab' : ''}>이용내역</span>
        </button>
        <button onClick={() => handleFooterClick('chat')}>
          <img src={activeTab === 'chat' ? Chat_color : Chat_none} alt="채팅" />
          <span className={activeTab === 'chat' ? 'active-tab' : ''}>채팅</span>
        </button>
        <button onClick={() => handleFooterClick('profile')}>
          <img src={activeTab === 'profile' ? Profile_color : Profile_none} alt="내 정보" />
          <span className={activeTab === 'profile' ? 'active-tab' : ''}>내 정보</span>
        </button>
      </footer>
    </div>
  );
};

export default VroongList;
