import React from "react";
import styles from "./VroongMoneyOut.module.css";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";

const VroongMoneyOut = () => {
const navigate = useNavigate();

  // 뒤로 가기 버튼
const goBack = () => navigate(-1);

return (
<div className={styles.VroongMoneyOutContainer}>
      {/* 헤더 */}
    <div className={styles.VroongMoneyOutHeader}>
        <img onClick={goBack} src={backb} className={styles.backButton} alt="뒤로가기 버튼" />
        <h2 className={styles.VroongMoneyOutTitle}>출금</h2>
    </div>

      {/* 출금금액 */}
    <div className={styles.VroongMoneyOutbalance}>
        <div className={styles.VroongMoneyOutmoney}>
            출금금액
        <input type="text" className={styles.Outinput} placeholder="얼마를 출금할까요?"/>
        </div>

        {/* 출금계좌 */}
        <div className={styles.accountOut}>
            <span className={styles.Outaccount}>출금계좌</span>
            <span className={styles.Outbank}>농협은행</span>
            <span className={styles.Outaccountnumber}>6623</span>
        </div>
        
        {/* 거래 후 잔액 */}
        <div className={styles.accountOut}>
            <span className={styles.Outaccount}>거래 후 잔액</span>
            <span className={styles.Outaccountbalance}>45,000원</span>
        </div>

        {/* 숫자 키패드 */}
        <div className={styles.accountnumberheader}>
            <span className={styles.accountnumber1}>1</span>
            <span className={styles.accountnumber2}>2</span>
            <span className={styles.accountnumber3}>3</span>
            <span className={styles.accountnumber4}>4</span>
            <span className={styles.accountnumber5}>5</span>
            <span className={styles.accountnumber6}>6</span>
            <span className={styles.accountnumber7}>7</span>
            <span className={styles.accountnumber8}>8</span>
            <span className={styles.accountnumber9}>9</span>
            <span className={styles.accountnumber0}>0</span>
            <span className={styles.clearnumber}>←</span>
        </div>

        {/* 출금하기 버튼 */}
        <div className={styles.VroongMoneyOutbuttonhead}>
            <button className={styles.VroongMoneyOutbutton}>출금하기</button>
        </div>
    </div>
</div>
);
};

export default VroongMoneyOut;