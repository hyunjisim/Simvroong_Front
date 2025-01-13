import React from "react";
import styles from "./FAQcustomer.module.css";
import backb from "../../img/back-arrow.png";
import nextarrow from "../../img/nextarrow.png";
import { useNavigate } from "react-router-dom";

const FAQcustomer = () => {
const navigate = useNavigate();

const goBack = () => navigate("/profile");
const goCustomer = () => navigate("/customer");
const goPartner = () => navigate("/partner");


return (
<div className={styles.faqcustomerContainer}>
      {/* 헤더 */}
    <div className={styles.faqcustomerHeader}>
        <img onClick={goBack} src={backb} className={styles.backb} alt="Back Button"/>
        <h2 className={styles.faqcustomername}>자주 하는 질문</h2>
    </div>

      {/*고객 버튼 디폴트 */}
    <div className={styles.tabContainer}>
        <button onClick={goCustomer} className={styles.customerable}>고객</button>
        <button onClick={goPartner} className={styles.partnerable}>파트너</button>
    </div>

      {/* 자주하는 질문 리스트 */}
    <div className={styles.faqcustomermenulist}>
        <div className={styles.faqcustomernum1}>
            Q '해주세요'는 어떤 서비스인가요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum2}>
            Q 도움을 주는 파트너의 신원은 어떻게 검증할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum3}>
            Q 심부름은 어떻게 요청할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum4}>
            Q 심부름을 요청하면 몇 km 반경 이내 파트너들에게 알림이 가나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum5}>
            Q 타 지역 파트너에게도 심부름을 요청할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum6}>
            Q 심부름비는 어떻게 정하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum7}>
            Q 물품 또는 음식 구매가 필요한 심부름의 겨우 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum8}>
            Q 파트너가 심부름 픽업지에 도착했는데 업체 측 사정으로 심부름을 완료하지 못했습니다. 심부름을 취소할 수도 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum9}>
            Q 매칭된 파트너가 심부름을 취소할 수도 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum10}>
            Q 파트너의 전문성은 어떻게 보장할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum11}>
            Q 파트너의 심부름 결과물에 대해 만족스럽지 못하면 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum12}>
            Q 저작권,소유권,사용권은 고객과 파트너 중 누구에게 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum13}>
            Q 파트너 지정 요청 시 미리 채팅을 할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum14}>
            Q 심부름비는 언제 결제되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum15}>
            Q 매칭된 파트너에게 어떻게 연락할 수 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum16}>
            Q 파트너와 매칭된 후 추가 심부름비 지급도 가능한가요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum17}>
            Q 심부름 취소 시 환불은 언제 되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum18}>
            Q 영수증 발급도 가능한가요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum19}>
            Q 집이나 사무실에 CCTV 혹은 홈 카메라가 설치되어 있다면 파트너에게 알려야하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum20}>
            Q 타 지역 파트너에게도 심부름을 요청 할 수있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum21}>
            Q 파트너와 주고받은 채팅은 어떻게 삭제하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum22}>
            Q 심부름 진행 중 어느 누구라도 피해를 입었다면 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum23}>
            Q 파트너를 신고 및 차단할 수도 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum24}>
            Q 이전에 매칭되었던 파트너에게 '해주세요'를 통하지 않고 따로 심부름을 요청해야 되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum25}>
            Q 심부름 진행 중 어느 누구라도 피해를 입었다면 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum26}>
            Q 파트너를 신고 및 차단할 수도 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum27}>
            Q 파트너에게 팁을 줄 수도 있나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum28}>
            Q 파트너로부터 부당한 일을 당하면 어떡하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum29}>
            Q 대리처방 요청이 가능한가요? 
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum30}>
            Q 담배 또는 주류 배달도 가능한가요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum31}>
            Q 어떤 경우에 심부름 이용 정지되나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
        <div className={styles.faqcustomernum32}>
            Q 회원 탈퇴는 어떻게 하나요?
            <img src={nextarrow} className={styles.nextarrow} alt="화살표 버튼" />
        </div>
    </div>
</div>
);
};

export default FAQcustomer;
