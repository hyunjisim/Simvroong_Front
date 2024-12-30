import React from "react";
import styles from "./TermsofUse.module.css";
import backb from "../../img/back-arrow.png";
import nextarrow from "../../img/nextarrow.png";
import { useNavigate } from "react-router-dom";

const TermsofUse = () => {
const navigate = useNavigate();

const goBack = () => navigate(-1);

return (
    <div className={styles.TermsofUseContainer}>
      {/* 헤더 */}
    <div className={styles.TermsofUseHeader}>
        <img onClick={goBack} src={backb} className={styles.backButton} alt="Back Button" />
        <h2 className={styles.headerTitle}>약관 및 정책</h2>
    </div>

      {/* 약관 및 정책 리스트 */}
    <div className={styles.menuList}>
        <div className={styles.TermsofUsenum1}>
        개인 정보 수집 및 이용 동의
        <img src={nextarrow} className={styles.arrowIcon} alt="화살표 버튼" />
        </div>
        <div className={styles.TermsofUsenum2}>
        개인 정보처리 방침
        <img src={nextarrow} className={styles.arrowIcon} alt="화살표 버튼" />
        </div>
        <div className={styles.TermsofUsenum3}>
        서비스 이용약관
        <img src={nextarrow} className={styles.arrowIcon} alt="화살표 버튼" />
        </div>
        <div className={styles.TermsofUsenum4}>
        위치기반서비스 이용약관
        <img src={nextarrow} className={styles.arrowIcon} alt="화살표 버튼" />
        </div>
        <div className={styles.TermsofUsenum5}>
        파트너 업무위수탁약관
        <img src={nextarrow} className={styles.arrowIcon} alt="화살표 버튼" />
        </div>
    </div>
</div>
);
};

export default TermsofUse;
