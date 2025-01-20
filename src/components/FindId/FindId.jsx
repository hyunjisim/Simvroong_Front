import { React, useState } from 'react'
import backb from '../../img/back-arrow.png'
import { useNavigate } from 'react-router-dom'
import styles from './FindId.module.css'
import axios from 'axios'

const FindId = () => {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [phoneFirst, setPhoneFirst] = useState('')
    const [phoneRest, setPhoneRest] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [foundId, setFoundId] = useState(null) // 아이디 찾기 성공 시 아이디 저장
    const [registrationDate, setRegistrationDate] = useState('') // 가입일 저장
    const [isCodeSent, setIsCodeSent] = useState(false)
    const [verificationStatus, setVerificationStatus] = useState(false)

    // 뒤로 가기 버튼
    const goBack = () => {
        navigate('/Login')
    }

    // 로그인 버튼 클릭 시
    const goLogin = () => {
        navigate('/Login')
    }

    // 비밀번호 찾기 클릭 시
    const goFindpw = () => {
        navigate('/Findpw')
    }

    // 폼 제출 시
    const handleSubmit = async e => {
        e.preventDefault()

        // 데이터 객체 생성
        const phoneNumber = `${phoneFirst}${phoneRest}`

        try {
            const response = await axios.post('http://192.168.163.8:8080/auth/findId', {
                name: name,
                phoneNumber: phoneNumber
            })

            if (response) {
                const gotUserId = response.data.user.userId
                const gotCreatedAt = response.data.user.createdAt.split('-')
                setFoundId(gotUserId)
                setRegistrationDate(`${gotCreatedAt[0]}년 ${gotCreatedAt[1]}월 ${gotCreatedAt[2].substring(0, 2)}일`)

                console.log('아이디 찾기 성공')
            } else {
                alert('입력한 정보와 일치하는 아이디가 없습니다.이름 또는 전화번호를 확인해주세요')
                setFoundId(null) // 실패 시 숨김
                console.log('일치하는 데이터 없음')
            }
        } catch (error) {
            console.error('Error:', error)
            alert('서버 오류가 발생했습니다.')
            setFoundId(null) // 오류 시 숨김
            console.log('서버 오류')
        }
    }

    const requestVerificationCode = async () => {
        const phoneNumber = `${phoneFirst}${phoneRest}`
        if (!phoneFirst || !phoneRest || phoneRest.length !== 8) {
            alert('휴대폰 번호를 정확히 입력해주세요.')
            return
        }

        try {
            // 인증번호 요청
            const response = await axios.post('http://192.168.163.8:8080/auth/sendCode', {
                phoneNumber: phoneNumber // JSON 형태로 전달
            })

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
            const response = await axios.post('http://192.168.163.8:8080/auth/verifyCode', {
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

    return (
        // 로고
        <form className={styles.findidform} onSubmit={e => e.preventDefault()}>
            {/* <div className={styles.findidall}> */}
            <div className={styles.findidheader}>
                <img onClick={goBack} src={backb} className={styles.backb} alt="뒤로가기 버튼" />
                <h2 className={styles.headeralrimh}>아이디 찾기</h2>
            </div>

            {/* 이름 */}
            <div className={styles.formel}>
                <label htmlFor="name">이름*</label>
                <input type="text" id="name" name="name" placeholder="이름을 입력하세요" maxLength={30} value={name} onChange={e => setName(e.target.value)} />
            </div>

            {/* 휴대폰 인증 */}
            <div className={styles.phonenumber}>
                <label htmlFor="phonenum">휴대폰 인증*</label>
                <div>
                    {/* 앞자리 선택 */}
                    <select className={styles.phonefirst} name="phone_first" value={phoneFirst} onChange={e => setPhoneFirst(e.target.value)}>
                        <option value="" className={styles.phonefirststyle}>
                            앞자리 선택
                        </option>
                        <option value="010">010</option>
                        <option value="011">011</option>
                        <option value="016">016</option>
                        <option value="017">017</option>
                        <option value="018">018</option>
                        <option value="019">019</option>
                    </select>
                    <span className={styles.dash}>-</span>
                    {/* 휴대폰 뒷자리 입력 */}
                    <input type="text" placeholder="8자리 입력" maxLength={8} value={phoneRest} onChange={e => setPhoneRest(e.target.value.replace(/[^0-9]/g, ''))} />
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
            {/* 아이디 찾기 */}
            <div className={styles.findidbutton}>
                <button onClick={handleSubmit} type="submit" className={styles.findidb}>
                    아이디 찾기
                </button>
            </div>

            {/* 아이디 찾기 성공 시 로그 표시 */}
            {foundId && (
                <div className={styles.findidlogall}>
                    <div className={styles.findidlog}>
                        <p className={styles.phonelog}>휴대전화번호 정보와 일치하는 아이디입니다</p>
                        <p className={styles.phonelogid}>아이디: {foundId}</p>
                        <p className={styles.phonelogregist}>가입일: {registrationDate}</p>
                    </div>
                </div>
            )}

            {/* 로그인, 비밀번호 찾기 버튼 */}
            <div className={styles.confirmbutton}>
                <button onClick={goLogin} type="button" className={styles.loginbutt}>
                    로그인
                </button>
            </div>
            <div className={styles.confirmbutton1}>
                <button onClick={goFindpw} type="button" className={styles.pwsearchbutt1}>
                    비밀번호 찾기
                </button>
            </div>
        </form>
    )
}

export default FindId
