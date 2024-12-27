import React from "react";
import { useNavigate } from "react-router-dom";
import backb from "../../img/back-arrow.png";
import sad from "../../img/sad.png";
import styles from "./AlrimAll.module.css";


const AlrimAll = () => {

  const navigate = useNavigate();
  


  //뒤로 가기 버튼
  const goBack = () => {
    navigate("/Alrim"); 
  };

  //수락 클릭시 이벤트
  const handleAccept = () => {
    alert("심부름 요청을 수락했습니다.");
  };

  //거절 클릭시 이벤트
  const handleReject = () => {
    alert("심부름 요청을 거절했습니다.");
  };

  return (
    //알림 헤더
<div className={styles.AlrimAll}>
      <div className={styles.alrimheader}>
      <img onClick={goBack} src={backb} className={styles.backb} alt="뒤로가기 버튼" />
        <h2 className={styles.headeralrimh}>전체</h2>
      </div>
      {/* 심부릉 신청 */}
      <div className={styles.alrimlist}>
        <img src={sad} alt="슬픈 이모티콘" />
        <div>
          <p className={styles.content}>음머 님이 '편의점 술사오기' 심부릉 
          하기를 신청하셨습니다.</p>
          <p className={styles.alrimmoney}>제안 금액 10,000원</p>
          {/* 수락 거절 버튼 */}
          <div className={styles.arbuttons}>
            <button className={styles.acceptbutton} onClick={handleAccept}>수락</button>
            <button className={styles.rejectbutton} onClick={handleReject}>거절</button>
          </div>
        </div>
      </div>
</div>
  );
}

export default AlrimAll