import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./step5.module.css";
import BackButtonIcon from "../../img/partnerSignUp/back-button.png";
import editProfilePlaceholder from "../../img/partnerSignUp/step5profile.png"; // Placeholder 이미지
import { useNavigate } from "react-router-dom";
import TransportBottomSheet from "./BottomSheet/TransportBottomSheet";
import WarningBottomSheet from "./BottomSheet/WarningBottomSheet";

const PartnershipStep5 = () => {
    const [introduction, setIntroduction] = useState("");
    const [transport, setTransport] = useState([]);
    const [showTip, setShowTip] = useState(false); // TIP 표시 상태
    const [showTransportBottomSheet, setShowTransportBottomSheet] = useState(false);
    const [showWarningBottomSheet, setShowWarningBottomSheet] = useState(false);

    const [profile, setProfile] = useState({ nickname: "", gender: "", ageGroup: "" });
    const [profileImage, setProfileImage] = useState(editProfilePlaceholder);
    const [errands, setErrands] = useState([]);

    const navigate = useNavigate();

    // 유저 데이터 불러오기
    useEffect(() => {
        console.log("Profile Image State:", profileImage);
        const fetchData = async () => {
            try {
                const token = sessionStorage.getItem("authToken");
                const response = await axios.get("http://localhost:8080/partnership/step5", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                // 백엔드에서 받은 응답 데이터 확인
                console.log("백엔드 응답 데이터:", response.data);
    
                const { nickname, gender, ageGroup, profileImage: partnerImage, errands } = response.data;
    
                setProfile({ nickname, gender, ageGroup });
    
                // 프로필 이미지 처리
                if (partnerImage && partnerImage.startsWith("http")) {
                    setProfileImage(partnerImage); // 절대 URL 그대로 사용
                } else {
                    setProfileImage(editProfilePlaceholder); // Placeholder 사용
                }
    
                setErrands(errands || []);
            } catch (error) {
                console.error("데이터 로드 실패:", error);
                alert("데이터를 로드하는 중 오류가 발생했습니다.");
            }
        };
    
        fetchData();
    }, []);

    // 완료 버튼 클릭 시 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!introduction || transport.length === 0) {
            alert("모든 필드를 입력해 주세요.");
            return;
        }

        try {
            const token = sessionStorage.getItem("authToken");
            const response = await axios.post(
                "http://localhost:8080/partnership/step5",
                { bio: introduction, transportation: transport },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("응답 데이터:", response.data);
            setShowWarningBottomSheet(true);
        } catch (error) {
            console.error("저장 실패:", error);
            alert("저장 중 오류가 발생했습니다.");
        }
    };

    const handleProfileEditClick = () => {
        navigate("/partnership/Step2");
    };

    const handleErrandEditClick = () => {
        navigate("/partnership/Step4");
    };

    const handleTransportConfirm = (selectedOptions) => {
        setTransport(selectedOptions);
        setShowTransportBottomSheet(false);
    };

    return (
        <section className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.pagetitle}>
                    <img src={BackButtonIcon} alt="뒤로가기 버튼" className={styles.backbutton} />
                    <h2>기본정보</h2>
                </div>
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                </div>
            </div>

            <div className={styles.content}>
                <form className={styles.errandForm}>
                    {/* Profile Section */}
                    <div className={styles.profileSection}>
                        <div className={styles.profileImage}>
                            <img src={profileImage} alt="프로필 이미지" className={styles.profilePicture} />
                            <div className={styles.editIcon} onClick={handleProfileEditClick}>
                                ✎
                            </div>
                        </div>
                        <div className={styles.userInfo}>
                            <div>{profile.nickname}</div>
                            <div>{`${profile.gender} · ${profile.ageGroup}`}</div>
                        </div>
                    </div>

                    <div className={styles.sectionline}></div>

                    {/* Introduction Section */}
                    <div className={styles.formcontent}>
                        <div className={styles.sectionInfoTitle}>
                            <span className={styles.InfoTitle}>자기소개</span>{" "}
                            <span className={styles.tip} onClick={() => setShowTip(!showTip)}>
                                작성 TIP
                            </span>
                            {showTip && (
                                <div className={styles.tipinfo}>
                                    <p>자신의 경력과 소지하고 있는 자격증을 어필하세요!</p>
                                    <p className={styles.ex}>예: 베이비 시터 경력 3년, 관련 자격증 보유</p>
                                </div>
                            )}
                        </div>
                        <textarea
                            className={styles.textArea}
                            value={introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                            maxLength="3000"
                        ></textarea>
                        <div>{introduction.length}/3000</div>
                    </div>

                    <div className={styles.sectionline}></div>

                    {/* Errands Section */}
                    <div className={styles.formcontent}>
                        <div className={styles.sectionTitle}>
                            <span>심부름</span>
                            <span className={styles.edit} onClick={handleErrandEditClick}>
                                수정
                            </span>
                        </div>
                        <div className={styles.tags}>
                            {errands.map((errand, index) => (
                                <span key={index} className={styles.tag}>
                                    {errand}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Transport Section */}
                    <div>
                        <div className={styles.sectionTitle}>
                            <span>이동 수단</span>
                            <span className={styles.edit} onClick={() => setShowTransportBottomSheet(true)}>
                                수정
                            </span>
                        </div>
                        <div className={styles.tags}>
                            <div className={styles.transportbox} onClick={() => setShowTransportBottomSheet(true)} >
                                <span>{transport.length > 0 ? transport.join(", ") : "이동 수단 선택"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button className={styles.submitButton} onClick={handleSubmit}>
                        완료
                    </button>
                </form>
            </div>

            {/* Transport Bottom Sheet */}
            {showTransportBottomSheet && (
                <TransportBottomSheet
                    transport={transport}
                    setTransport={setTransport}
                    onClose={() => setShowTransportBottomSheet(false)}
                    onConfirm={handleTransportConfirm}
                />
            )}

            {/* Warning Bottom Sheet */}
            {showWarningBottomSheet && (
                <WarningBottomSheet
                    onClose={() => setShowWarningBottomSheet(false)}
                    onConfirm={() => navigate("/success")} // 성공 시 이동할 경로
                />
            )}
        </section>
    );
};

export default PartnershipStep5;
