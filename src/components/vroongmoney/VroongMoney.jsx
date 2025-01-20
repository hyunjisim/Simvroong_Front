import React, { useState, useEffect } from 'react';
import styles from "./VroongMoney.module.css";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const VroongMoney = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


  // 뒤로 가기 버튼
    const goBack = () => navigate("/profile");
    const charge = () => navigate("/charge");
    const out = () => navigate("/out");

    const fetchAccount = async () => {
        const token = sessionStorage.getItem("authToken");
        if (!token) throw new Error("토큰이 없습니다. 다시 로그인해주세요.");

        const response = await axios.get(
            `http://192.168.163.8:8080/money`,
            {
                headers: { Authorization: `Bearer ${token}` },
            });
        console.log(response.data.transactions);
    };
    useEffect(() => {
        setLoading(true);
        fetchAccount();
    }, []); // activeTab 변경 시 데이터 재요청

    if (loading) {
        return <div>로딩 중...</div>;
    }
return (
<div className={styles.VroongMoneyContainer}>
      {/* 헤더 */}
    <div className={styles.VroongMoneyHeader}>
        <img onClick={goBack} src={backb} className={styles.backButton} alt="뒤로가기 버튼" />
        <h2 className={styles.VroongMoneyTitle}>부릉머니</h2>
    </div>

      {/* 입금출금 내역 */}
    <div className={styles.VroongMoneyHead}>
        <span className={styles.moneytitle}>부릉머니</span>
        <span className={styles.moneybalance}>23,000원</span>
        <div className={styles.balancebutton}>
        <button onClick={charge} className={styles.moneyin}>충전</button>
        <button onClick={out} className={styles.moneyout}>출금</button>
        </div>
    </div>
    
    <div className={styles.balanceheader}>
        <div className={styles.balanceheaderdetail}>
        총 3건
        {/* 부릉머니 충전 */}
        <div className={styles.balancemoneyedit1}>
            <span className={styles.balanceday1}>12.04</span>
            <span className={styles.balancetime1}>22:30</span>
            <span className={styles.balancename1}>부릉머니 충전</span>
            <span className={styles.balancemoney1}>+10,000</span>
        </div>
        <div className={styles.balancemoneyedit2}>
            <span className={styles.balanceday2}>12.03</span>
            <span className={styles.balancetime2}>22:30</span>
            <span className={styles.balancename2}>부릉머니 출금</span>
            <span className={styles.balancemoney2}>-27,000</span>
        </div>
        <div className={styles.balancemoneyedit2_1}>
            <span className={styles.balanceday2_1}>12.03</span>
            <span className={styles.balancetimeplus2_1}>22:30</span>
            <span className={styles.balancenameplus2_1}>심부릉 수익</span>
            <span className={styles.balancemoney2_1}>+20,000</span>
        </div>
        <div className={styles.balancemoneyedit2_2}>
            <span className={styles.balanceday2_2}>12.03</span>
            <span className={styles.balancetimeplus2_2}>22:30</span>
            <span className={styles.balancenameplus2_2}>부릉머니 사용</span>
            <span className={styles.balancemoney2_2}>-10,000</span>
        </div>
        <div className={styles.balancemoneyedit3}>
            <span className={styles.balanceday3}>12.01</span>
            <span className={styles.balancetime3}>22:30</span>
            <span className={styles.balancename3}>부릉머니 충전</span>
            <span className={styles.balancemoney3}>+30,000</span>
        </div>
    </div>
    </div>
</div>
);
};

export default VroongMoney;

