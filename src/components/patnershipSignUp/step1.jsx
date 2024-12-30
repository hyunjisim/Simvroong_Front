import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"; // 페이지 이동 훅 가져오기
import styles from "./step1.module.css"
import PhotoIcon from "../../img/partnerSignUp/image-add.png"
import BackButtonIcon from "../../img/partnerSignUp/back-button.png"

const PartnershipStep1 = () => {

    const navigate = useNavigate(); // 페이지 이동 함수

    const [formData, setFormData] = useState({
        name: "",
        ssnFirst: "",
        ssnSecond: "",
    })
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 URL 상태 추가

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value, // 변경된 필드만 업데이트
        });
    }

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

        // 필수 필드 체크
        if (!file) {
            alert("신분증 사진이 첨부되지 않았습니다.");
            return;
        }
        if (!formData.name.trim()) {
            alert("이름이 입력되지 않았습니다.");
            return;
        }
        if (!formData.ssnFirst.trim() || !formData.ssnSecond.trim()) {
            alert("주민등록번호가 입력되지 않았습니다.");
            return;
        }

        const data = new FormData();
        data.append("idPhoto", file);
        data.append("name", formData.name);
        data.append("ssn", `${formData.ssnFirst}-${formData.ssnSecond}`);
        
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('토큰이 없습니다.');
            }

            const response = await axios.post("http://localhost:8080/partnership/step1", data, {
                headers: {
                'Authorization': `Bearer ${token}`,
                },
        })
        console.log(data)
        alert("제출 성공");

        // 성공 시 Step2 페이지로 이동
        navigate("/partnership/Step2");

        } catch (error) {
            if (error.response && error.response.data) {
                console.error(error.response.data);
                alert(`제출 실패: ${error.response.data.message || '오류가 발생했습니다.'}`);
            } else {
                console.error(error.message);
                alert(`제출 실패: ${error.message}`);
            }
        }
    }

    return (
        <section className={styles.container}>
            {/* 헤더 섹션 */}
            <div className={styles.header}>
                <div  className={styles.pagetitle}>
                    <img src={BackButtonIcon} alt="뒤로가기 버튼" className={styles.backbutton} />
                    <h2>본인확인</h2>
                </div>
                {/* 단계 표시 바 */}
                <div className={styles.progressBar}>
                    <div className={`${styles.step} ${styles.active}`}></div>
                    <div className={styles.step}></div>
                    <div className={styles.step}></div>
                    <div className={styles.step}></div>
                    <div className={styles.step}></div>
                </div>
            </div>

            {/* 컨텐츠 영역 */}
            <div className={styles.content}>
                <form className={styles.partnershipform} onSubmit={handleSubmit} encType="multipart/form-data">

                <p className={styles.titletext}>신분증 전체를 첨부해 주세요</p>

                    <p className={styles.subtext}>본인확인과 종합소득세 신고 외의 용도로 사용되지 않아요</p>

                    <div className={styles.fileupload}>
                        <label htmlFor="idPhoto" className={styles.filelabel}>
                            {previewImage ? (
                                    <img
                                    src={URL.createObjectURL(file)}
                                    alt="사진 첨부 미리보기"
                                    className={styles.image}
                                />
                            ) : (
                                <>
                                    <img src={PhotoIcon} alt="사진첨부 아이콘" className={styles.icon} />
                                </>
                            )}
                        </label>

                        <input type="file" id="idPhoto" name="idPhoto" accept="image/*" onChange={handleFileChange} required />
                    </div>

                    <div className={styles.inputgroup}>
                        <label>이름</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="이름 입력"
                            value={formData.name}
                            onChange={handleChange}
                            onInvalid={(e) => e.target.setCustomValidity("이름을 입력해 주세요.")}
                            onInput={(e) => e.target.setCustomValidity("")}
                            required
                        />
                    </div>

                    <div className={styles.inputgroup}>
                        <label>주민등록번호</label>
                        <div className={styles.ssninputs}>
                            <input
                                type="text"
                                name="ssnFirst"
                                placeholder="숫자 입력"
                                maxLength="6"
                                value={formData.ssnFirst}
                                onChange={handleChange}
                                required
                            />
                            <span>-</span>
                            <input
                                type="text"
                                name="ssnSecond"
                                placeholder="숫자 입력"
                                maxLength="7"
                                value={formData.ssnSecond}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <button className={styles.submitButton} type="submit">다음</button>
                </form>
            </div>
        </section>
    );
};

export default PartnershipStep1;