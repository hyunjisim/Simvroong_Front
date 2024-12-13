import React, { useState } from "react";
import "./request.css";

const Request = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");

  return (
    <div className="request-container">
      <header className="request-header">
        <h1>심부름 의뢰하기</h1>
      </header>

      <form className="request-form">
        {/* 의뢰 제목 */}
        <div className="form-group">
          <label htmlFor="title">의뢰 제목</label>
          <input
            type="text"
            id="title"
            placeholder="간단하게 의뢰 내용을 입력해주세요."
            maxLength={50}
          />
        </div>

        {/* 요청 내용 */}
        <div className="form-group">
          <label htmlFor="description">요청 내용</label>
          <textarea
            id="description"
            placeholder="어떤 도움을 원하시나요? 자세히 적을수록 정확한 도움을 받을 수 있어요."
            maxLength={1000}
          />
        </div>

        {/* 이미지 업로드 */}
        <div className="form-group">
          <label>이미지 업로드</label>
          <button type="button" className="upload-button">
            파일을 업로드하세요
          </button>
        </div>

        {/* 위치 */}
        <div className="form-group">
          <label htmlFor="location">어디에서 진행할까요?</label>
          <input type="text" id="location" placeholder="주소 입력" />
        </div>

        {/* 체크박스 섹션 */}
        <div className="form-group">
          <label>현장에 CCTV가 있나요?</label>
          <div className="checkbox-group">
            <label>
              <input type="radio" name="cctv" value="있음" /> 있음
            </label>
            <label>
              <input type="radio" name="cctv" value="없음" /> 없음
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>현장 소음은 심할까요?</label>
          <div className="checkbox-group">
            <label>
              <input type="radio" name="noise" value="예" /> 예
            </label>
            <label>
              <input type="radio" name="noise" value="아니요" /> 아니요
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>특히 주의가 필요한가요?</label>
          <div className="checkbox-group">
            <label>
              <input type="radio" name="attention" value="예" /> 예
            </label>
            <label>
              <input type="radio" name="attention" value="아니요" /> 아니요
            </label>
          </div>
        </div>

        {/* 일정 선택 */}
        <div className="form-group">
          <label htmlFor="date">언제 의뢰할까요?</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">시간을 선택해주세요</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        {/* 예상 소요시간 */}
        <div className="form-group">
          <label htmlFor="time">예상 소요시간을 입력해주세요</label>
          <input
            type="time"
            id="budget"
            placeholder="예: 2시간"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />
        </div>

        {/* 세부사항 */}
        <div className="form-group">
          <label htmlFor="details">세부사항을 입력해주세요</label>
          <textarea
            id="details"
            placeholder="추가적으로 필요한 내용을 입력하세요."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        {/* 제출 버튼 */}
        <button type="submit" className="submit-button">
          완료
        </button>
      </form>
    </div>
  );
};

export default Request;
