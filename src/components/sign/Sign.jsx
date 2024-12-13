import React, { useState, useEffect } from "react";
import backb from "../../img/back-arrow.png";
import { useNavigate } from "react-router-dom";
import './Sign.css';
import axios from "axios";

const Sign = () => {
  const navigate = useNavigate();

  // 상태 관리
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [gender, setGender] = useState("");
  const [phoneFirst, setPhoneFirst] = useState(""); // 휴대폰 번호 앞자리
  const [phoneRest, setPhoneRest] = useState(""); // 휴대폰 번호 뒷자리
  const [verifyCode, setVerifyCode] = useState(""); // 인증번호 입력값
  const [verificationStatus, setVerificationStatus] = useState(false); // 인증 상태 메시지
  const [agreements, setAgreements] = useState({
    all: false,
    check1: false,
    check2: false,
    check3: false,
    check4: false,
    check5: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 약관 데이터 가져오기
  const [terms, setTerms] = useState([]);
  useEffect(() => {
    const fetchTerms = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/terms");
        setTerms(response.data);
        setLoading(false);
      } catch (err) {
        console.error("약관 데이터를 불러오는 중 오류 발생:", err);
        setError("약관 데이터를 가져오는 데 실패했습니다.");
        setLoading(false);
      }
    };
    fetchTerms();
  }, []);

  // 뒤로가기 버튼 이벤트
  const goBack = () => {
    navigate("/Login");
  };

  // 약관 동의 상태 관리
  const handleAllAgreement = () => {
    const newStatus = !agreements.all;
    setAgreements({
      all: newStatus,
      check1: newStatus,
      check2: newStatus,
      check3: newStatus,
      check4: newStatus,
      check5: newStatus,
    });
  };

  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
      all: false, // 개별 변경 시 전체 동의 해제
    }));
  };

  // 가입하기 버튼 이벤트
  const handleSubmit = async () => {
    const birthDate = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`;
    const userData = {
      birthDate,
      gender,
      phone: `${phoneFirst}-${phoneRest}`,
      agreements,
    };

    try {
      const response = await axios.post("http://localhost:8080/signup", userData);
      alert("회원가입 성공!");
      navigate("/Login");
    } catch (err) {
      console.error("회원가입 실패:", err);
      alert("회원가입에 실패했습니다.");
    }
  };

  // 인증번호 요청
  const requestVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}-${phoneRest}`;
    
    if (!phoneFirst || !phoneRest || phoneRest.length !== 8) {
      alert("휴대폰 번호를 정확히 입력해주세요.");
      return;
    }
  
    try {
      // 인증번호 요청
      const response = await axios.post("http://localhost:8080/sendCode", {
        body: JSON.stringify({
          phoneNumber
        })
      });
  
      // 서버 응답 처리
      if (response.data.success) {
        alert(response.data.message || "인증번호가 발송되었습니다.");
        setVerificationStatus("sent");
      } else {
        throw new Error(response.data.message || "인증번호 발송 실패");
      }
    } catch (err) {
      console.error("인증번호 발송 실패:", err);
      alert("인증번호 발송에 실패했습니다.");
      setVerificationStatus("failed");
    }
  };

  const confirmVerificationCode = async () => {
    const phoneNumber = `${phoneFirst}-${phoneRest}`;
  
    if (!verifyCode) {
      alert("인증번호를 입력해주세요.");
      return;
    }
  
    try {
      // 인증번호 확인
      const response = await axios.post("http://localhost:8080/verifyCode", {
        phone: phoneNumber,
        code: verifyCode,
      });
  
      // 서버 응답 처리
      if (response.data.success) {
        alert(response.data.message || "인증이 완료되었습니다.");
        setVerificationStatus("verified");
      } else {
        throw new Error(response.data.message || "인증번호 확인 실패");
      }
    } catch (err) {
      console.error("인증 실패:", err);
      alert("인증번호가 올바르지 않습니다.");
      setVerificationStatus("failed");
    }
  };


  return (
    <div className="sign-All">
      <div className="sign-header">
        <img onClick={goBack} src={backb} className="backb" alt="뒤로가기 버튼" />
        <h2 className="headeralrimh">회원가입</h2>
      </div>

      <div className="form-el-nick">
        <label htmlFor="nickname">닉네임*</label>
        <input id="nickname" name="nickname" />
      </div>

      <div className="form-el-id">
        <label htmlFor="id">아이디*</label>
        <input id="id" name="id" maxLength={10} />
      </div>

      <div className="form-el-pw">
        <label htmlFor="password">비밀번호*</label>
        <input type="text" id="password" name="password" maxLength={20} />
      </div>

      <div className="form-el-pwc">
        <label htmlFor="password-confirm">비밀번호 확인*</label>
        <input type="text" id="password-confirm" name="password-confirm" maxLength={20} />
      </div>

      <div className="form-el-name">
        <label htmlFor="name">이름*</label>
        <input id="name" name="name" />
      </div>

      <div className="form-el-birth">
        <label>생년월일*</label>
        <div className="birth-container">
          <select className="box" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">년</option>
            {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select className="box" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">월</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          <select className="box" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
            <option value="">일</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-el-gender">
        <label htmlFor="gender">성별*</label>
        <select className="gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">선택</option>
          <option value="M">남자</option>
          <option value="F">여자</option>
        </select>
      </div>

      <div className="form-el-phone">
        <label htmlFor="phonenum">휴대폰 인증*</label>
        <div className="phone-container">
          <select className="phone_first" name="phone_first" value={phoneFirst} onChange={(e) => setPhoneFirst(e.target.value)}>
            <option value="">앞자리 선택</option>
            <option value="010">010</option>
            <option value="011">011</option>
            <option value="016">016</option>
            <option value="017">017</option>
            <option value="018">018</option>
            <option value="019">019</option>
          </select>
        -
        <input
          type="text"
          placeholder="8자리 입력"
          maxLength={8}
          value={phoneRest}
          onChange={(e) => setPhoneRest(e.target.value)}
        />
        </div>
      </div>

      <div className="verify-num">
        <input
          type="text"
          placeholder="인증번호를 입력하세요"
          maxLength={20}
          value={verifyCode}
          onChange={(e) => setVerifyCode(e.target.value)}
        />
        <button className="verify-button" onClick={requestVerificationCode}>인증번호 받기</button>
        <button className="confirm-button" onClick={confirmVerificationCode}>인증번호 확인</button>

        {/* 인증 상태 메시지 표시 */}
        {verificationStatus === "sent" && <p className="status-message">인증번호가 발송되었습니다.</p>}
        {verificationStatus === "verified" && <p className="status-message success">인증이 완료되었습니다.</p>}
        {verificationStatus === "failed" && <p className="status-message error">인증에 실패했습니다. 다시 시도해주세요.</p>}
      </div>
      

      <div className="agreement-all">
        <div className="p-7 border-b text-tc-middle mobile:p-4">
          <input
            type="checkbox"
            id="all-check"
            checked={agreements.all}
            onChange={handleAllAgreement}
          />
          <label htmlFor="all-check">모두 동의합니다.</label>
        </div>

        <p className="select_agree">선택 동의 항목 포함</p>
        <div className="agree-f1">
          <input type="checkbox" id="check1" />
          <label htmlFor="check1">[필수] 만 14세 이상입니다</label>
        </div>
        <div className="agree-f2">
          <input type="checkbox" id="check2" />
          <label htmlFor="check2">[필수] 이용약관 동의</label>
        </div>
        <div className="agree-f2">
          <input type="checkbox" id="check3" />
          <label htmlFor="check3">[필수] 개인 정보 수집 및 이용 동의</label>
        </div>
        <div className="agree-op1">
          <input type="checkbox" id="check4" />
          <label htmlFor="check4">[선택] 개인 정보 수집 및 이용 동의</label>
        </div>
        <div className="agree-op2">
          <input type="checkbox" id="check5" />
          <label htmlFor="check5">[선택] 광고성 정보 수신 모두 동의</label>
        </div>
      </div>

      <div className="login-button">
        <button onClick={handleSubmit} className="login-item" aria-label="가입하기">
          가입하기
        </button>
      </div>
    </div>
  );
}

export default Sign;


