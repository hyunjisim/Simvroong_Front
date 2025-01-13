import React from "react";
import styles from "./FAQ.module.css";
import backb from "../../img/back-arrow.png";
import nextarrow from "../../img/nextarrow.png";
import { useNavigate } from "react-router-dom";

const FAQ = () => {
const navigate = useNavigate();

const goBack = () => navigate("/profile");
const goCustomer = () => navigate("/customer");
const goPartner = () => navigate("/partner");

return (
<div className={styles.faqContainer}>
      {/* 헤더 */}
    <div className={styles.faqHeader}>
        <img onClick={goBack} src={backb} className={styles.backb} alt="Back Button"/>
        <h2 className={styles.faqname}>자주 하는 질문</h2>
    </div>

      {/* 버튼 선택 */}
    <div className={styles.tabContainer}>
        <button onClick={goCustomer} className={styles.customerable}>고객</button>
        <button onClick={goPartner} className={styles.partnerable}>파트너</button>
    </div>

      {/* 자주하는 질문 리스트 */}
    <div className={styles.faqmenulist}>
        <div className={styles.faqnum1}>
            Q 파트너는 누구나 지원할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum2}>
            Q 파트너로 수익을 벌면 현재 재직 중인 직장에서 겸업으로 불이익이 없나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum3}>
            Q 고객은 어떤 방법으로 파트너에게 심부름을 요청하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum4}>
            Q 심부릉 요청을 많이 받을 수 있는 방법이 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum5}>
            Q 검색 화면을 보면 심부름이 많이 보이는데 왜 제겐 알림이 울린것 같지 않나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum6}>
            Q 고객이 "심부름 요청하기" 로 심부름을 요청하면 반경 몇 km 파트너들에게 알림이 가나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum7}>
            Q 대리처방으로 의심되는 심부름 요청이 있습니다. 어떻게 해야 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum8}>
            Q 매칭된 고객에게는 어떻게 연락할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum9}>
            Q 파트너가 이미 수락하거나 수행 중인 심부름을 파트너 본인이 취소할 수도 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum10}>
            Q 이미 시작한 심부름을 고객이 취소하거나, 심부름 픽업지에 도착했는데 업체 측 사정으로 완료하지 못했어요. 심부름비는 못 받나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum11}>
            Q 심부름 도착지에 왔는데 고객과 연락이 되지 않아요. 어떡해야 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum12}>
            Q 본인 명의가 아닌 가족이나 타 명의 계좌를 등록하여 수익금을 받을 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum13}>
            Q 규정을 위반하여 파트너 활동이 정지된 경우 그동안 적립된 심부름비를 받을 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum14}>
            Q 수익금 정산시 수수료는 어떻게 되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum15}>
            Q 산재/고용보험 관련 자주 묻는 질문
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum16}>
            Q 심부름비에 포함된 물품/음식값에 대해서도 수수료가 차감되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum17}>
            Q 심부름비에 포함된 물품/음식값이 포함된 심부름인지 어떻게 확인하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum18}>
            Q 심부름비에 물품/음식값이 포함되어 있는데, 영수증이 없으면 어떻게 해야 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum19}>
            Q 물품비가 심부름비와 별도인 심부름인데 고객이 물품을 받은 후 물품의 값을 입금하지 않으면 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum20}>
            Q 해주세요 알림음을 끌 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum21}>
            Q 고객이 남긴 리뷰를 수정하거나 삭제할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum22}>
            Q 담배 또는 주류 배달 심부름 요청도 가능한가요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum23}>
            Q 심부름을 해드렸던 고객에게 해주세요를 통하지 않고 따로 심부름 요청을 받아도 되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum24}>
            Q 어떤 경우에 파트너 활동이 정지되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum25}>
            Q 고객이 심부름 결과물에 대해 만족하지 못한 경우 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqnum26}>
            Q 저작권, 소유권, 사용권은 파트너와 고객 중 누구에게 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
    </div>
</div>
);
};

export default FAQ;
