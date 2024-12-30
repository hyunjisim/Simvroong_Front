import React, { useState, useEffect } from 'react'
import backb from '../../img/back-arrow.png'
import { useNavigate } from 'react-router-dom'
import styles from './sign.module.css'
import axios from 'axios'

const Sign = () => {
    const navigate = useNavigate()

    const [selectedYear, setSelectedYear] = useState('')
    const [selectedMonth, setSelectedMonth] = useState('')
    const [selectedDay, setSelectedDay] = useState('')
    const [gender, setGender] = useState('')
    const [phoneFirst, setPhoneFirst] = useState('') // 휴대폰 번호 앞자리
    const [phoneRest, setPhoneRest] = useState('') // 휴대폰 번호 뒷자리
    const [verifyCode, setVerifyCode] = useState('') // 인증번호 입력값
    const [verificationStatus, setVerificationStatus] = useState(false) // 인증 상태 메시지
    const [agreements, setAgreements] = useState({
        all: false,
        check1: false,
        check2: false,
        check3: false,
        check4: false
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isCodeSent, setIsCodeSent] = useState(false)

    // 뒤로가기 버튼 이벤트
    const goBack = () => {
        navigate('/login')
    }

    // 약관 동의 상태 관리
    const handleAllAgreement = () => {
        const newStatus = !agreements.all
        setAgreements({
            all: newStatus,
            check1: newStatus,
            check2: newStatus,
            check3: newStatus,
            check4: newStatus
        })
    }

    const handleAgreementChange = key => {
        setAgreements(prev => ({
            ...prev,
            [key]: !prev[key],
            all: false
        }))
    }

    // 가입하기 버튼 이벤트
    const handleSubmit = async () => {
        const birth = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`

        const nickname = document.getElementById('nickname').value.trim()
        const userId = document.getElementById('id').value.trim()
        const password = document.getElementById('password').value.trim()
        const confirmPassword = document.getElementById('password-confirm').value.trim()
        const name = document.getElementById('name').value.trim()

        const userData = {
            nickname: nickname,
            userId: userId,
            password: password,
            name: name,
            birth: birth,
            gender: gender,
            phoneNumber: `${phoneFirst}${phoneRest}`,
            agreements: agreements
        }

        // 필수 약관 체크 여부 확인
        if (!agreements.check1 || !agreements.check2 || !agreements.check3) {
            alert('필수 약관을 모두 동의해주세요.')
            return
        }

        // 필수 입력값 검증
        if (!userData.nickname || !userData.userId || !userData.password || !userData.name || !birth || !gender) {
            alert('모든 필수 항목을 입력해주세요.')
            return
        }

        if (userData.password !== confirmPassword) {
            alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
            return
        }

        try {
            await axios.post('http://127.0.0.1:8080/auth/signup', userData)
            alert('회원가입이 완료되었습니다!')
            navigate('/login')
        } catch (err) {
            console.error('회원가입 실패:', err)
            alert('회원가입에 실패했습니다. 다시 시도해주세요.')
        }
    }

    // 인증번호 요청
    const requestVerificationCode = async () => {
        const phoneNumber = `${phoneFirst}${phoneRest}`
        if (!phoneFirst || !phoneRest || phoneRest.length !== 8) {
            alert('휴대폰 번호를 정확히 입력해주세요.')
            return
        }

        try {
            // 인증번호 요청
            const response = await axios.post('http://127.0.0.1:8080/auth/sendCode', {
                phoneNumber: phoneNumber // JSON 형태로 전달
            })

            console.log(response)
            
            // 서버 응답 처리
            if (response) {
                alert('인증번호가 발송되었습니다.')
                setVerificationStatus('sent')
                setIsCodeSent(true)
            } else {
                throw new Error('인증번호 발송 실패')
            }
        } catch (err) {
            console.error('인증번호 발송 실패:', err)
            alert('인증번호 발송에 실패했습니다.')
            setVerificationStatus('failed')
        }
    }

    const confirmVerificationCode = async () => {
        const phoneNumber = `${phoneFirst}${phoneRest}`

        if (!verifyCode) {
            alert('인증번호를 입력해주세요.')
            return
        }

        try {
            // 인증번호 확인
            const response = await axios.post('http://127.0.0.1:8080/auth/verifyCode', {
                phoneNumber: phoneNumber,
                code: verifyCode
            })

            // 서버 응답 처리
            if (response) {
                alert('인증이 완료되었습니다.')
                setVerificationStatus('verified')
            } else {
                throw new Error('인증번호 확인 실패')
            }
        } catch (err) {
            console.error('인증 실패:', err)
            alert('인증번호가 올바르지 않습니다.')
            setVerificationStatus('failed')
        }
    }

    // 비밀번호 숨김 설정
    const [seePassword, setSeePassword] = useState(true)
    // 비밀번호
    const [userPassword, setUserPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    // 비밀번호 보이기/숨기기 핸들러
    const seePasswordHandler = () => {
        setSeePassword(!seePassword)
    }

    return (
        // 회원가입폼
        <form className={styles.signAll} onSubmit={e => e.preventDefault()}>
            <div className={styles.signheader}>
                <img onClick={goBack} src={backb} className={styles.backb} alt="뒤로가기 버튼" />
                <h2 className={styles.headeralrimh}>회원가입</h2>
            </div>
            {/* 닉네임 */}
            <div className={styles.formelnick}>
                <label htmlFor="nickname">닉네임*</label>
                <input id="nickname" name="nickname" />
            </div>
            {/* 아이디 */}
            <div className={styles.formelid}>
                <label htmlFor="id">아이디*</label>
                <input id="id" name="id" maxLength={10} />
            </div>
            {/* 비밀번호 */}
            <div className={styles.formelpw}>
                <label htmlFor="password">비밀번호*</label>
                <input type="password" id="password" placeholder="비밀번호를 입력해주세요" value={userPassword} onChange={e => setUserPassword(e.target.value)}
                 maxLength={30} autoComplete="off" />
            </div>
            {/* 비밀번호 확인 */}
            <div className={styles.formelpwc}>
                <label htmlFor="password-confirm">비밀번호 확인*</label>
                <input
                    type="password"
                    id="password-confirm"
                    placeholder="비밀번호를 다시 입력해주세요"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    maxLength={30}
                    autoComplete="off"
                />
            </div>
            {/* 이름 */}
            <div className={styles.formelname}>
                <label htmlFor="name">이름*</label>
                <input id="name" name="name" />
            </div>
            {/* 생년월일 */}
            <div className={styles.formelbirth}>
                <label>생년월일*</label>
                <div className={styles.birthcontainer}>
                    <select className={styles.box} value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                        <option value="">년</option>
                        {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i).map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <select className={styles.box} value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                        <option value="">월</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select className={styles.box} value={selectedDay} onChange={e => setSelectedDay(e.target.value)}>
                        <option value="">일</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* 성별 */}
            <div className={styles.formelgender}>
                <label htmlFor="gender">성별*</label>
                <select className={styles.gender} id="gender" value={gender} onChange={e => setGender(e.target.value)}>
                    <option value="">선택</option>
                    <option value="male">남자</option>
                    <option value="female">여자</option>
                </select>
            </div>
            {/* 휴대폰 인증 */}
            <div className={styles.formelphone}>
                <label htmlFor="phonenum">휴대폰 인증*</label>
                <div className={styles.phonecontainer}>
                    <select className={styles.phonefirst} name="phone_first" value={phoneFirst} onChange={e => setPhoneFirst(e.target.value)}>
                        <option value="">앞자리 선택</option>
                        <option value="010">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                    </select>
                    <span className={styles.dash}>-</span>
                    <input type="text" placeholder="8자리 입력" maxLength={8} value={phoneRest} onChange={e => setPhoneRest(e.target.value)} />
                </div>
            </div>
            {/* 인증번호 */}
            <div className={styles.verifynum}>
                <input type="text" placeholder="인증번호를 입력하세요" maxLength={20} value={verifyCode} onChange={e => setVerifyCode(e.target.value)} />
                <button
                    type="button"
                    className={styles.verifybutton}
                    onClick={async () => {
                        if (!isCodeSent) {
                            try {
                                await requestVerificationCode() // 인증번호 발송 요청
                                setIsCodeSent(true) // 버튼 상태 변경
                                setVerificationStatus('') // 문구를 초기화하여 숨김
                            } catch (error) {
                                console.error(error)
                                alert('인증번호 발송이 실패했습니다. 다시 시도해주세요.')
                            }
                        } else {
                            try {
                                await confirmVerificationCode() // 인증번호 확인 요청
                                setVerificationStatus('') // 문구를 초기화하여 숨김
                            } catch (error) {
                                console.error(error)
                                alert('인증에 실패했습니다. 다시 시도해주세요.')
                            }
                        }
                    }}
                >
                    {isCodeSent ? '인증번호 확인' : '인증번호 받기'}
                </button>
            </div>

            {/* 동의 */}
            <div className={styles.agreementall}>
                {/* 전체 동의 체크 */}
                <div className={styles.p7}>
                    <input type="checkbox" id="all-agree" checked={agreements.all} onChange={handleAllAgreement} />
                    <label htmlFor="all-agree">모두 동의합니다.</label>
                </div>

                <p className={styles.selectagree}> 선택 동의 항목 포함</p>
                <div className={styles.agreeoptions}>
                    <div className={styles.agreeitem}>
                        <input type="checkbox" id="check1" checked={agreements.check1} onChange={() => handleAgreementChange('check1')} />
                        <label htmlFor="check1">[필수] 만 14세 이상입니다</label>
                    </div>
                    <div className={styles.agreeitem}>
                        <input type="checkbox" id="check2" checked={agreements.check2} onChange={() => handleAgreementChange('check2')} />
                        <label htmlFor="check2">[필수] 이용약관 동의</label>
                    </div>
                    <div className={styles.agreeitem}>
                        <input type="checkbox" id="check3" checked={agreements.check3} onChange={() => handleAgreementChange('check3')} />
                        <label htmlFor="check3">[필수] 개인정보 수집 및 이용 동의</label>
                    </div>
                    <div className={styles.agreeitem}>
                        <input type="checkbox" id="check4" checked={agreements.check4} onChange={() => handleAgreementChange('check4')} />
                        <label htmlFor="check4">[선택] 광고성 정보 수신 모두 동의</label>
                    </div>
                </div>
                {/* 가입하기 */}
                <div className={styles.loginbutton}>
                    <button onClick={handleSubmit} className={styles.loginitem} aria-label="가입하기">
                        가입하기
                    </button>
                </div>
            </div>
        </form>
    )
}

export default Sign
