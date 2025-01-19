import React, { useState } from "react";
import styles from "./request.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backb from "../../img/back-arrow.png";
import imgPut from "../../img/imgput.png";
import search from "../../img/search.png";
import CategoryBottomSheet from "./CategoryBottomSheet";

const Request = () => {
  const [selectedFile, setSelectedFile] = useState(null); // 실제 파일 객체
  const [imageUrl, setImageUrl] = useState(null); // 업로드된 S3 URL
  const [address, setAddress] = useState("");
  const [detailedAddress, setDetailedAddress] = useState("");
  const [category, setCategory] = useState("");
  const [isCategorySheetOpen, setIsCategorySheetOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [requestDetails, setRequestDetails] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [expectedTime, setExpectedTime] = useState("");
  const [fee, setFee] = useState("");
  const [cctvOption, setCctvOption] = useState("");
  const [petOption, setPetOption] = useState("");
  const [parkingOption, setParkingOption] = useState("");
  const [partnerPreference, setPartnerPreference] = useState("");
  const [isFeeNegotiable, setIsFeeNegotiable] = useState(false);

  const navigate = useNavigate();
  const goBack = () => navigate("/main");

  // 카테고리 선택 핸들러
  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsCategorySheetOpen(false);
  };

  // 이미지 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImageUrl(URL.createObjectURL(file)); // 로컬 미리보기
    }
  };

  // 이미지 업로드
  const uploadImageToS3 = async () => {
    if (!selectedFile) {
      alert("파일이 선택되지 않았습니다.");
      return null;
    }
  
    const formData = new FormData();
    formData.append("file", selectedFile);
  
    try {
      const token = sessionStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8080/order/upload", // S3 업로드 엔드포인트
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 && response.data.url) {
        console.log("S3 업로드 성공:", response.data.url);
        return response.data.url;
      } else {
        console.error("S3 업로드 실패:", response.data);
        alert("이미지 업로드 실패");
      }
    } catch (error) {
      console.error("S3 업로드 중 오류 발생:", error);
      alert("이미지 업로드 중 오류 발생");
    }
    return null;
  };
  

  // 데이터 제출 함수
  const handleSubmit = async () => {
    try {
      // S3 업로드
      const photoUrl = await uploadImageToS3();
  
      // S3 업로드 실패 시 처리
      if (!photoUrl) {
        alert("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
        return;
      }
  
      const userData = {
        category,
        title,
        taskDetails: {
          description: requestDetails,
          photoUrl, // 업로드된 URL 사용
        },
        location: {
          area: address,
          detailedAddress,
          extraNotes: "",
        },
        conditions: {
          hasCCTV: cctvOption === "있어요",
          hasAnimals: petOption === "있어요",
          partnerParkingAvailable: parkingOption === "가능해요",
        },
        partnerPreference: {
          gender: partnerPreference,
          ageRange: "",
          otherPreferences: "",
        },
        schedule: {
          date,
          time: startTime,
          estimatedDuration: expectedTime,
        },
        payment: {
          serviceFee: fee,
          minFee: 5000,
        },
        isFeeNegotiable,
      };
  
      // 토큰 확인
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        alert("로그인이 필요합니다. 다시 로그인해주세요.");
        navigate("/login");
        return;
      }
  
      // 심부름 생성 요청
      const response = await axios.post(
        "http://127.0.0.1:8080/order/create",
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // 요청 성공 처리
      if (response.status === 201) {
        alert("심부름 의뢰가 완료되었습니다!");
        console.log("심부름 생성 성공:", response.data);
        navigate("/main");
      }
    } catch (error) {
      // 요청 실패 처리
      console.error("심부름 생성 중 오류 발생:", error);
  
      // 서버로부터의 응답 메시지 확인
      if (error.response && error.response.data) {
        alert(`심부름 생성 실패: ${error.response.data.message}`);
      } else {
        alert("심부름 생성 실패. 네트워크 상태를 확인해주세요.");
      }
    }
  };
  
  

  const handleCctvClick = (option) => setCctvOption(option);
  const handlePetClick = (option) => setPetOption(option);
  const handleParkingClick = (option) => setParkingOption(option);
  const handlePartnerClick = (option) => setPartnerPreference(option);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          onClick={goBack}
          src={backb}
          className={styles.backb}
          alt="뒤로가기 버튼"
        />
        <h1 className={styles.title}>심부름 의뢰하기</h1>
      </div>

      {/* 카테고리 */}
      <div className={styles.section}>
        <label>카테고리</label>
        <button
          className={styles.categoryButton}
          onClick={() => setIsCategorySheetOpen(true)}
        >
          {category || "의뢰할 심부름의 카테고리를 선택해주세요"}
        </button>
      </div>

      {isCategorySheetOpen && (
        <CategoryBottomSheet
          onClose={() => setIsCategorySheetOpen(false)}
          onSelect={handleCategorySelect}
        />
      )}

      {/* 제목 */}
      <div className={styles.section}>
        <label>제목</label>
        <input
          type="text"
          placeholder="요청 심부름에 어울리는 제목을 작성해 주세요"
          className={styles.input}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* 요청사항 */}
      <div className={styles.section}>
        <label>무엇을 요청할까요?</label>
        <textarea
          placeholder="수거할 품목, 수거할 양, 기타 요청 사항 등 입력"
          maxLength="500"
          className={styles.textarea}
          value={requestDetails}
          onChange={(e) => setRequestDetails(e.target.value)}
        ></textarea>
      </div>

      {/* 사진 업로드 */}
      <div className={styles.imageUploadContainer}>
        <label className={styles.uploadLabel}>
          <input
            type="file"
            accept="image/*"
            className={styles.fileInput}
            onChange={handleFileChange}
          />
          <div className={styles.uploadBox}>
            <img
              src={imageUrl || imgPut}
              alt="이미지 미리보기"
              className={styles.previewImage}
            />
          </div>
          <span className={styles.uploadText}>사진을 등록해 보세요</span>
        </label>
      </div>

      {/* 주소 입력 */}
      <div className={styles.section}>
        <label>어디에서 진행할까요?</label>
        <div className={styles.addressContainer}>
          <input
            type="text"
            placeholder="주소 검색"
            className={styles.input}
            value={address}
            readOnly
          />
          <img
            src={search}
            alt="검색 아이콘"
            className={styles.searchIcon}
            onClick={() => {
              new window.daum.Postcode({
                oncomplete: (data) => {
                  setAddress(data.address);
                },
              }).open();
            }}
          />
        </div>
        <input
          type="text"
          placeholder="상세 주소"
          className={styles.input}
          value={detailedAddress}
          onChange={(e) => setDetailedAddress(e.target.value)}
        />
        <label>무엇을 요청할까요?</label>
        <textarea
            placeholder="수거할 품목, 수거할 양, 기타 요청 사항 등 입력"
            maxLength="500"
            className={styles.textarea}
            value={requestDetails}
            onChange={(e) => setRequestDetails(e.target.value)}
        ></textarea>
      </div>

      {/* CCTV 옵션 */}
      <div className={styles.optionSection}>
        <label>진행 장소에 CCTV가 있나요?</label>
        <div className={styles.options}>
          <button
            className={`${styles.optionButton} ${
              cctvOption === "있어요" ? styles.active : ""
            }`}
            onClick={() => handleCctvClick("있어요")}
          >
            있어요
          </button>
          <button
            className={`${styles.optionButton} ${
              cctvOption === "없어요" ? styles.active : ""
            }`}
            onClick={() => handleCctvClick("없어요")}
          >
            없어요
          </button>
        </div>
      </div>

      {/* 반려동물 옵션 */}
      <div className={styles.optionSection}>
        <label>진행 장소에 반려동물이 있나요?</label>
        <div className={styles.options}>
          <button
            className={`${styles.optionButton} ${
              petOption === "있어요" ? styles.active : ""
            }`}
            onClick={() => handlePetClick("있어요")}
          >
            있어요
          </button>
          <button
            className={`${styles.optionButton} ${
              petOption === "없어요" ? styles.active : ""
            }`}
            onClick={() => handlePetClick("없어요")}
          >
            없어요
          </button>
        </div>
      </div>

      {/* 주차 옵션 */}
      <div className={styles.optionSection}>
        <label>파트너 주차가 가능한가요?</label>
        <div className={styles.options}>
          <button
            className={`${styles.optionButton} ${
              parkingOption === "가능해요" ? styles.active : ""
            }`}
            onClick={() => handleParkingClick("가능해요")}
          >
            가능해요
          </button>
          <button
            className={`${styles.optionButton} ${
              parkingOption === "불가능해요" ? styles.active : ""
            }`}
            onClick={() => handleParkingClick("불가능해요")}
          >
            불가능해요
          </button>
        </div>
      </div>

      {/* 파트너 선호 */}
      <div className={styles.optionSection}>
        <label>어떤 파트너를 선호하시나요?</label>
        <div className={styles.options}>
          <button
            className={`${styles.optionButton}

            ${
              partnerPreference === "무관" ? styles.active : ""
            }`}
            onClick={() => handlePartnerClick("무관")}
          >
            무관
          </button>
          <button
            className={`${styles.optionButton} ${
              partnerPreference === "남성" ? styles.active : ""
            }`}
            onClick={() => handlePartnerClick("남성")}
          >
            남성
          </button>
          <button
            className={`${styles.optionButton} ${
              partnerPreference === "여성" ? styles.active : ""
            }`}
            onClick={() => handlePartnerClick("여성")}
          >
            여성
          </button>
        </div>
      </div>

      {/* 예약 날짜 및 시간 */}
      <div className={styles.section}>
        <label>언제로 예약할까요?</label>
        <input
          type="date"
          className={styles.input}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label>심부름 시작 시간을 선택해 주세요</label>
        <input
          type="time"
          className={styles.input}
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>

      <div className={styles.section}>
        <label>심부름 예상 소요시간을 알려주세요</label>
        <input
          type="text"
          placeholder="예: 0시간 00분"
          className={styles.input}
          value={expectedTime}
          onChange={(e) => setExpectedTime(e.target.value)}
        />
      </div>

      {/* 심부름비 입력 */}
      <div className={styles.section}>
        <label>심부름비를 입력해 주세요</label>
        <div className={styles.feeInputContainer}>
          <input
            type="number"
            placeholder="0"
            className={styles.input}
            value={fee}
            onChange={(e) => setFee(e.target.value)}
          />
          <span className={styles.feeUnit}>원</span>
        </div>
        <div className={styles.feeNegotiableContainer}>
          <input
            type="checkbox"
            id="feeNegotiable"
            className={styles.checkbox}
            checked={isFeeNegotiable}
            onChange={(e) => setIsFeeNegotiable(e.target.checked)}
          />
          <label htmlFor="feeNegotiable" className={styles.checkboxLabel}>
            금액 제안 허용
          </label>
        </div>
      </div>

      <button onClick={handleSubmit} className={styles.completeButton}>
        완료
      </button>
    </div>
  );
};

export default Request;
