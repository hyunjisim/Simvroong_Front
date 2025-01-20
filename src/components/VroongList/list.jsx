import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './list.module.css';
import Sad from '../../img/sad.png';
import Home_none from '../../img/footer/Home-none-color.png';
import Details_color from '../../img/footer/Details-color.png';
import Chat_none from '../../img/footer/Chat-none-color.png';
import Profile_none from '../../img/footer/Profile-none-color.png';

const VroongList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('my'); // 기본 탭: 나의 부릉부릉
  const [myVroongList, setMyVroongList] = useState([]); // 나의 부릉부릉 리스트
  const [requestedVroongList, setRequestedVroongList] = useState([]); // 수행 요청 부릉부릉 리스트
  const [loading, setLoading] = useState(true);

  // "나의 부릉부릉" 데이터 가져오기
  const fetchMyVroongList = async () => {
    try {
      const token = sessionStorage .getItem('authToken');
      const response = await axios.get('http://192.168.163.8:8080/list/mylist', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formattedData = response.data.data.map((order) => ({
        taskId: order.taskId,
        title: order.title,
        thumnail: order.thumnail,
        location: order.location,
        schedule: order.schedule,
        payment: order.payment,
        isActive: order.isActive,
      }));
      
      setMyVroongList(formattedData);
    } catch (error) {
      console.error('나의 부릉부릉 데이터를 가져오는 데 실패했습니다:', error);
      setMyVroongList([]);
    } finally {
      setLoading(false);
    }
  };

  // "수행 요청 부릉부릉" 데이터 가져오기
  const fetchRequestedVroongList = async () => {
    try {
      const token = sessionStorage.getItem('authToken');
      const response = await axios.get('http://192.168.163.8:8080/list/partner', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const formattedData = response.data.data.map((order) => ({
        taskId: order.taskId,
        title: order.title,
        thumnail: order.thumnail,
        location: order.location,
        schedule: order.schedule,
        payment: order.payment,
        isActive: order.isActive,
      }));
      setRequestedVroongList(formattedData);
    } catch (error) {
      console.error('수행 요청 부릉부릉 데이터를 가져오는 데 실패했습니다:', error);
      setRequestedVroongList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (activeTab === 'my') {
      fetchMyVroongList();
    } else if (activeTab === 'request') {
      fetchRequestedVroongList();
    }
  }, [activeTab]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const displayList = activeTab === 'my' ? myVroongList : requestedVroongList;

  return (
    <div className={styles.vroongContainer}>
      {/* 헤더 */}
      <header className={styles.vroongHeader}>
        <h1>부릉 리스트</h1>
        
      </header>

      <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === 'my' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('my')}
          >
            나의 부릉부릉
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === 'request' ? styles.activeTab : ''}`}
            onClick={() => handleTabChange('request')}
          >
            수행 요청 부릉부릉
          </button>
        </div>

      {/* 메인 */}
      <main className={styles.vroongMain}>
        {loading ? (
          <div>로딩 중...</div>
        ) : displayList.length === 0 ? (
          <div className={styles.emptyState}>
            <img src={Sad} alt="슬픈 이모티콘" />
            <p>{activeTab === 'my' ? '심부름 내역이 없어요.' : '수행 요청 내역이 없어요.'}</p>
          </div>
        ) : (
          displayList.map((item) => (
            console.log('item',item),
            <div
              key={item.taskId}
              className={styles.vroongItem}
              onClick={() => navigate(`/post/${item.taskId}`)}
            >
              <img
                src={item.thumnail || 'https://via.placeholder.com/60'}
                alt={item.title}
                className={styles.vroongImage}
              />
              <div className={styles.vroongContent}>
                <span
                  className={`${styles.vroongTag} ${
                    item.isActive ? '진행중' : '완료'
                  }`}
                >
                  {item.isActive ? '진행중' : '완료'}
                </span>
                <h3>{item.title}</h3>
                <p className={styles.locationTime}>
                  <span>{item.location?.area || '지역 정보 없음'}</span>
                  <span>{item.schedule?.estimatedDuration || '시간 정보 없음'}</span>
                </p>
                <div className={styles.priceReview}>
                  <p className={styles.vroongPrice}>
                    {item.payment?.serviceFee
                      ? `${item.payment.serviceFee.toLocaleString()}원`
                      : '0원'}
                  </p>
                  {!item.isActive && (
                    <button
                      className={styles.reviewBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('후기 보내기 기능 구현 필요');
                      }}
                    >
                      후기 보내기
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      {/* 푸터 */}
      <footer className={styles.vroongFooter}>
        <button onClick={() => navigate('/main')}>
          <img src={Home_none} alt="홈" />
          <span>홈</span>
        </button>
        <button onClick={() => navigate('/vroonglist')}>
          <img src={Details_color} alt="이용 내역" />
          <span>이용내역</span>
        </button>
        <button onClick={() => navigate('/chat')}>
          <img src={Chat_none} alt="채팅" />
          <span>채팅</span>
        </button>
        <button onClick={() => navigate('/profile')}>
          <img src={Profile_none} alt="내 정보" />
          <span>내 정보</span>
        </button>
      </footer>
    </div>
  );
};

export default VroongList;
