import { React } from "react";
//import { axios, useEffect, setAlrim } from "react";
import { useNavigate } from "react-router-dom";
import backb from "../../img/back-arrow.png";
import sad from "../../img/sad.png";
import styles from "./Alrim.module.css";


export default function Alrim() {
  
  const navigate = useNavigate();
  
  //적립 이벤트 상세보기 id값
  const handleItemClick = (id) => {
    navigate(`/AlrimDetail/${id}`);
  };

  //편의점 술사오기 상세보기 idx 값
  const handleItemsClick = (idx) => {
    navigate(`/AlrimAll/${idx}`);
  };
  
  //뒤로가기 버튼시 이벤트
  const goBack = () => {
    navigate("/main"); 
  };

  return (
// 알림 헤더
<div className={styles.AlrimAll}>
      <div className={styles.alrimheader}>
          <img onClick={goBack} src={backb} className={styles.backb} alt="뒤로가기 버튼" />
          <h2 className={styles.headeralrimh}>알림</h2>
      </div>
    {/* 쿠폰 적립 이벤트 */}
    <div className={styles.alrimlist} onClick={() => handleItemClick(1)}>
          <img src={sad} alt="슬픈 이모티콘" />
        <div id="item-list-title1">
            <p className={styles.couponevent}>2,000원 쿠폰 적립 이벤트에 참여하세요.</p>
            <p className={styles.contenthour}>1시간 전</p>
        </div>
    </div>
    {/* 심부릉 신청하기 */}
    <div className={styles.alrimlist} onClick={() => handleItemsClick(1)}>
          <img src={sad} alt="슬픈 이모티콘" />
          <div id="item-list-title2">
            <p className={styles.content}>음머 님이 '편의점 술사오기' 심부릉 하기를 신청하셨습니다.</p>
            <p className={styles.contenthour}>4시간 전</p>
          </div>
    </div>
</div>
    );
  }


// 이 부분 백엔드 연결을 위해 만들어 놈
  // 백엔드에서 데이터를 가져오는 함수
  //const fetchAlrim = async () => {
   // try {
    //  const response = await axios.get('http://localhost:5000/alrim'); // 백엔드 API URL
     // setAlrim(response.data); // 받아온 데이터를 상태에 저장
      //console.log('test')
   // } catch (error) {
     // console.error('데이터를 가져오는 중 오류 발생:', error);
   // }
 // };
  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  //useEffect(() => {
   // fetchAlrim();
  //}, []);/=
