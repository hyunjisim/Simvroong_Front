import React from "react";
import { useNavigate } from "react-router-dom";
// import { Outlet, useNavigate } from 'react-router-dom';
import backb from "../../img/back-arrow.png";
import styles from "./AlrimDetail.module.css";


const AlrimDetail = () => {

  const navigate = useNavigate();

  //뒤로 가기 버튼
  const goBack = () => {
    navigate("/Alrim"); 
  };


  return (

<div className={styles.alrimdetailall}>
    <div className={styles.alrimheader}>
          <img onClick={goBack} src={backb} className={styles.backb} alt="뒤로가기 버튼" />
          <h2 className={styles.headeralrimh}>이벤트</h2>
      </div>
    <div className={styles.alrimdetail}>
      <p className={styles.couponevent}>2,000원 쿠폰 적립 이벤트에 참여하세요.</p>
      <p className={styles.contenthour}>5분 전</p>
      <p className={styles.contentevent}>'심부릉' 회원님에게 드리는 특별 이벤트!</p>
      <p className={styles.contentdetail}>Play 스토어에 '심부릉' 앱 사용 리뷰를 작업한 후 캡처하여 카톡 채널로
        닉네임과 함께 보내주시면 쿠폰을 적립해 드려요.</p>
      <p className={styles.alrimreview}>리뷰 작성하러 가기</p>
    </div>
          
</div>

  );
}

export default AlrimDetail
