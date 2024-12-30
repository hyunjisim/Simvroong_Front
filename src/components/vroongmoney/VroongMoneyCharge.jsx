import React from "react";
import styles from "./VroongMoneyCharge.module.css";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";

const VroongMoneyCharge = () => {
const navigate = useNavigate();

  // 뒤로 가기 버튼
const goBack = () => navigate(-1);

return (
<div className={styles.VroongMoneyChargeContainer}>
      {/* 헤더 */}
    <div className={styles.VroongMoneyChargeHeader}>
        <img onClick={goBack} src={backb} className={styles.backButton} alt="뒤로가기 버튼" />
        <h2 className={styles.VroongMoneyChargeTitle}>충전</h2>
    </div>

      {/* 충전금액 */}
    <div className={styles.VroongMoneyChargebalance}>
        <div className={styles.VroongMoneyChargemoney}>
            충전금액
        <input type="text" className={styles.chargeinput} placeholder="얼마를 충전할까요?"/>
        </div>

        {/* 충전계좌 */}
        <div className={styles.accountcharge}>
            <span className={styles.chargeaccount}>충전계좌</span>
            <span className={styles.chargebank}>농협은행</span>
            <span className={styles.chargeaccountnumber}>6623</span>
        </div>
        
        {/* 거래 후 잔액 */}
        <div className={styles.accountcharge}>
            <span className={styles.chargeaccount}>거래 후 잔액</span>
            <span className={styles.chargeaccountbalance}>45,000원</span>
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

        {/* 충전하기 버튼 */}
        <div className={styles.VroongMoneyChargebuttonhead}>
            <button className={styles.VroongMoneyChargebutton}>충전하기</button>
        </div>
    </div>
</div>
);
};

export default VroongMoneyCharge;