import React from "react";
import styles from "./Notice.module.css";
import backb from "../../img/back-arrow.png";
import nextarrow from "../../img/nextarrow.png";
import { useNavigate } from "react-router-dom";

const Notice = () => {
const navigate = useNavigate();

const goBack = () => navigate(-1);

return (
<div className={styles.noticeContainer}>
      {/* 헤더 */}
    <div className={styles.noticeHeader}>
        <img onClick={goBack} src={backb} className={styles.backb} alt="Back Button"/>
        <h2 className={styles.noticename}>공지사항</h2>
    </div>

    {/* { text: "화물 유상운송 서비스 관련 공지 드립니다." },
        { text: "[클린 캠페인] 안전한 거래를 위해 꼭 지켜주세요!" },
        { text: "배달,퀵 수익금 '산재 보험' 및 '고용보험' 공제 안내" },
        { text: "수익금 수수료 변경 안내" },
        { text: "100만 다운로드 돌파 기념 이벤트", highlight: true },
        { text: "가입자 10만명 돌파 기념 이벤트", highlight: true }, */}



      {/* 공지사항 리스트 */}
    <div className={styles.noticemenulist}>
        <div className={styles.noticenum1}>
        화물 유상운송 서비스 관련 공지 드립니다.
        <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼"/>
        </div>
        <div className={styles.noticenum2}>
        [클린 캠페인] 안전한 거래를 위해 꼭 지켜주세요!
        <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼"/>
        </div>
        <div className={styles.noticenum3}>
        배달,퀵 수익금 '산재 보험' 및 '고용보험' 공제 안내
        <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼"/>
        </div>
        <div className={styles.noticenum4}>
        수익금 수수료 변경 안내
        <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼"/>
        </div>
        <div className={styles.noticenum5}>
        <p className={styles.eventlabel1}>이벤트</p>
        100만 다운로드 돌파 기념 이벤트
        <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼"/>
        </div>
        <div className={styles.noticenum5}>
        <p className={styles.eventlabel2}>이벤트</p>
        가입자 10만명 돌파 기념 이벤트
        <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼"/>
        </div>
    </div>
</div>
);
};

export default Notice;
