import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅 가져오기
import styles from "./step2.module.css"
import PhotoIcon from "../../img/partnerSignUp/image-add.png"
import BackButtonIcon from "../../img/partnerSignUp/back-button.png"

const PartnershipStep2 = () => {

    const navigate = useNavigate(); // 페이지 이동 함수

    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 URL 상태

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        // FileReader로 이미지 미리보기 URL 생성
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result); // 이미지 URL 상태 업데이트
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreviewImage(null); // 파일이 없을 경우 초기화
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("facePhoto", file);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('토큰이 없습니다.');
            }

            const response = await axios.post("http://localhost:8080/partnership/step2", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log(response.data);
            alert("프로필 사진 업로드 성공");

            // 성공 시 Step3 페이지로 이동
            navigate("/partnership/Step3");

        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("프로필 사진 업로드 실패");
        }
    };

    return (
        <section className={styles.container}>
            {/* 헤더 섹션 */}
            <div className={styles.header}>
                {/* 뒤로가기 버튼이랑 페이지 타이틀 섹션 */}
                <div className={styles.pagetitle}>
                <img src={BackButtonIcon} alt="뒤로가기 버튼" className={styles.backbutton} />
                <h2>프로필 사진</h2>
                </div>


                {/* 단계 표시 바 */}
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={styles.step}></div>
                    <div className={styles.step}></div>
                    <div className={styles.step}></div>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className={styles.content}>
                <form className={styles.partnershipform} onSubmit={handleSubmit} encType="multipart/form-data">

                <p className={styles.titletext}>파트너십 활동에 사용할<br />
                    프로필 사진을 업로드 해주세요</p>

                    <p className={styles.subtext}>파트너십 프로필 사진을 올려주세요</p>

                    <div className={styles.fileupload}>
                        <label htmlFor="facePhoto" className={styles.filelabel}>
                            {previewImage ? (
                                    <img
                                    src={URL.createObjectURL(file)}
                                    alt="사진 첨부 미리보기"
                                    className={styles.image}
                                    
                                />
                            ) : (
                                <>
                                    <img src={PhotoIcon} alt="사진첨부 아이콘" className={styles.icon}/>
                                </>
                            )}
                        </label>
                        <input type="file" id="facePhoto" name="facePhoto" accept="image/*" onChange={handleFileChange} required />
                    </div>
                    <button className={styles.submitButton} type="submit">다음</button>
                </form>
            </div>
        </section>
    );
};

export default PartnershipStep2;