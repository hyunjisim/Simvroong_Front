import React, { useState } from "react";

import styles from "./step3.module.css";
import BackButtonIcon from "../../img/partnerSignUp/back-button.png";

// 바텀 시트 페이지 부분
import BottomSheet from './BottomSheet/BottomSheet'; // 은행 선택 바텀시트
import BottomSheet2 from './BottomSheet/BottomSheet2'; // 계좌 확인 바텀시트

const PartnershipStep3 = () => {

    const [isSheetOpen, setIsSheetOpen] = useState(false); // 은행 선택 바텀시트 상태
    const [showBottomSheet2, setShowBottomSheet2] = useState(false); // 계좌 확인 바텀시트 상태

    const [selectedBank, setSelectedBank] = useState(null);
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState(""); 

    const handleBankSelect = (bank) => {
        setSelectedBank(bank); // 선택한 은행 저장
        console.log("선택된 은행:", bank);
        setIsSheetOpen(false); // 바텀시트 닫기
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("selectedBank:", selectedBank);
        console.log("accountNumber:", accountNumber);
        console.log("accountHolder:", accountHolder);

        if (!selectedBank || !accountNumber || !accountHolder) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }
        setShowBottomSheet2(true); // 계좌 확인 바텀시트 열기
    };

    return (
        <section className={styles.container}>
            {/* 헤더 섹션 */}
            <div className={styles.header}>
                <div className={styles.pagetitle}>
                    <img src={BackButtonIcon} alt="뒤로가기 버튼" className={styles.backbutton} />
                    <h2>계좌 정보</h2>
                </div>
                {/* 단계 표시 바 */}
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={styles.step}></div>
                    <div className={styles.step}></div>
                </div>
            </div>

            {/* 입력 폼 */}
            <div className={styles.content}>
                <form className={styles.partnershipform} onSubmit={handleSubmit}>
                    <p className={styles.titletext}>입금 계좌 정보를<br /> 입력해 주세요</p>
                    <p className={styles.subtext}>반드시 본인 명의의 계좌를 입력해 주세요</p>

                    <div className={styles.inputgroup}>
                        <label>은행</label>
                        <input
                            type="text"
                            placeholder="은행 검색"
                            value={selectedBank ? selectedBank.name : ""}
                            readOnly
                            onClick={() => setIsSheetOpen(true)} // 은행 선택 바텀시트 열기
                        />
                    </div>

                    <div className={styles.inputgroup}>
                        <label>계좌번호</label>
                        <input
                            type="text"
                            placeholder="숫자 입력"
                            value={accountNumber}
                            onChange={(e) => setAccountNumber(e.target.value)}
                        />
                    </div>

                    <div className={styles.inputgroup}>
                        <label>예금주</label>
                        <input
                            type="text"
                            placeholder="예금주 입력"
                            value={accountHolder}
                            onChange={(e) => setAccountHolder(e.target.value)}
                        />
                    </div>

                    <button type="submit" className={styles.submitButton}>다음</button>
                </form>
            </div>

            {/* 은행 선택 바텀시트 */}
            {isSheetOpen && (
                <div className={styles.overlay}>
                    <BottomSheet
                        onClose={() => setIsSheetOpen(false)}
                        onSelect={handleBankSelect}
                    />
                </div>
            )}

            {/* 계좌 확인 바텀시트 */}
            {showBottomSheet2 && (
                <div className={styles.overlay}>
                    <BottomSheet2
                        bankName={selectedBank.name}
                        accountNumber={accountNumber}
                        accountHolder={accountHolder}
                        onClose={() => setShowBottomSheet2(false)}
                    />
                </div>
            )}
        </section>
    );
};

export default PartnershipStep3;
