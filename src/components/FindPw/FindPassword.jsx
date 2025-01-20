import React, { useState } from 'react'
import backb from '../../img/back-arrow.png'
import { useNavigate } from 'react-router-dom'
import styles from './FindPassword.module.css'
import axios from 'axios'

const FindPassword = () => {
    const navigate = useNavigate()

    // 상태 관리
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [phoneFirst, setPhoneFirst] = useState('')
    const [phoneRest, setPhoneRest] = useState('')
    const [verifyCode, setVerifyCode] = useState('') // 입력된 인증번호
    const [isCodeSent, setIsCodeSent] = useState(false) // 인증번호 요청 상태
    const [isCodeVerified, setIsCodeVerified] = useState(false) // 인증 성공 상태
    const [tempPassword, setTempPassword] = useState('') // 임시 비밀번호 상태

    // 뒤로 가기 버튼
    const goBack = () => navigate('/login')
    const goLogin = () => navigate('/login')

    // 인증번호 요청
    const requestVerificationCode = async () => {
        const phoneNumber = `${phoneFirst}${phoneRest}`
        if (!phoneFirst || !phoneRest) {
            alert('휴대폰 번호를 입력해주세요.')
            return
        }

        try {
            await axios.post('http://192.168.163.8:8080/auth/sendCode', { phoneNumber })
            alert('인증번호가 발송되었습니다.')
            setIsCodeSent(true)
        } catch (error) {
            console.error('인증번호 발송 실패:', error)
            alert('인증번호 발송에 실패했습니다. 다시 시도해주세요.')
        }
    }

    // 인증번호 확인
    const confirmVerificationCode = async () => {
        const phoneNumber = `${phoneFirst}${phoneRest}`
        if (!verifyCode) {
            alert('인증번호를 입력해주세요.')
            return
        }

        try {
            await axios.post('http://192.168.163.8:8080/auth/verifyCode', {
                phoneNumber,
                code: verifyCode
            })
            alert('인증이 완료되었습니다.')
            setIsCodeVerified(true)
        } catch (error) {
            console.error('인증 실패:', error)
            alert('인증번호가 올바르지 않습니다.')
        }
    }

    // 비밀번호 찾기 요청
    const handleFindPassword = async e => {
        e.preventDefault()

        if (!isCodeVerified) {
            alert('휴대폰 인증을 완료해주세요.')
            return
        }

        const data = {
            name: name,
            userId: id,
            phoneNumber: `${phoneFirst}${phoneRest}`
        }

        try {
            const response = await axios.post('http://192.168.163.8:8080/auth/findPw', data)

            if (response) {
                setTempPassword(response.data.tempPassword)
                alert('임시 비밀번호가 발급되었습니다.')
            } else {
                alert('입력하신 정보와 일치하는 비밀번호를 찾을 수 없습니다.')
            }
        } catch (error) {
            console.error('비밀번호 찾기 오류:', error)
            alert('서버 오류가 발생했습니다. 다시 시도해주세요.')
        }
    }

    return (
        <form className={styles.findpwform} onSubmit={handleFindPassword}>
            <div className={styles.findpwall}>
                {/* 헤더 */}
                <div className={styles.findpwheader}>
                    <img className={styles.backb} onClick={goBack} src={backb} alt="뒤로가기 버튼" />
                    <h2 className={styles.headerfindpw}>비밀번호 찾기</h2>
                </div>

                {/* 이름 */}
                <div className={styles.formpw}>
                    <label htmlFor="name">이름*</label>
                    <input id="name" name="name" placeholder="이름을 입력하세요" value={name} onChange={e => setName(e.target.value)} />
                </div>

                {/* 아이디 */}
                <div className={styles.formpw}>
                    <label htmlFor="id">아이디*</label>
                    <input id="id" name="id" placeholder="아이디를 입력하세요" value={id} onChange={e => setId(e.target.value)} />
                </div>

                {/* 휴대폰 인증 */}
                <div className={styles.phonenumber}>
                    <label htmlFor="phone-num">휴대폰 인증*</label>
                    <div>
                        <select className={styles.phonefirstpw} name="phone_firstpw" value={phoneFirst} onChange={e => setPhoneFirst(e.target.value)}>
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

                {/* 인증번호 확인 */}
                <div className={styles.verifypwc}>
                    <input type="text" placeholder="인증번호를 입력하세요" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} />
                    {!isCodeSent ? (
                        <button type="button" onClick={requestVerificationCode} className={styles.verifybutton}>
                            인증번호 받기
                        </button>
                    ) : (
                        <button type="button" onClick={confirmVerificationCode} className={styles.verifybutton}>
                            인증번호 확인
                        </button>
                    )}
                </div>

                {/* 비밀번호 찾기 버튼 */}
                <div className={styles.findpwbutton}>
                    <button type="submit" className={styles.findpwb}>
                        비밀번호 찾기
                    </button>
                </div>

                {/* 임시 비밀번호 표시 */}
                {tempPassword && (
                    <div className={styles.temppassword}>
                        임시 비밀번호: <strong>{tempPassword}</strong>
                    </div>
                )}

                {/* 로그인 버튼 */}
                <div className={styles.confirmpwbutton}>
                    <button onClick={goLogin} type="button" className={styles.loginpwbutt}>
                        로그인
                    </button>
                </div>
            </div>
        </form>
    )
}

export default FindPassword
