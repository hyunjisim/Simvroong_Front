import React, { useState } from 'react'
import logo from '../../img/simvroong.png'
import kakao from '../../img/Kakao_logo.png'
import styles from './Login.module.css' // CSS 모듈 사용
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const fetchLogin = async () => {
        try {
            const response = await axios.post('http://192.168.163.8:8080/auth/login', {
                userId,
                password
            })
            const token = response.data.token
            const nickname = response.data.userNickname

            if (response.status === 200) {
                sessionStorage.setItem('authToken', token)
                sessionStorage.setItem('nickname', nickname)

                navigate('/Main')
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message || '로그인에 실패했습니다.')
            } else {
                setError('서버와 연결할 수 없습니다.')
            }
        }
    }

    const goLoginMain = () => {
        if (userId.trim() !== '' && password.trim() !== '') {
            fetchLogin()
        } else {
            alert('아이디 또는 비밀번호를 확인해주세요.')
        }
    }

    const goSign = () => {
        navigate('/Sign')
    }

    const goFindId = () => {
        navigate('/FindId')
    }

    const goFindPw = () => {
        navigate('/FindPw')
    }

    return (
        <div className={styles.loginAll}>
            <div className={styles.loginHeader}>
                <img className={styles.logo} src={logo} alt="Logo" />
            </div>
            <div className={styles.all}>
                <form className={styles.body}>
                    <p className={styles.iditem}>아이디</p>
                    <input type="text" className={styles.inputstId} placeholder="예) apple0000" maxLength={30} value={userId} onChange={e => setUserId(e.target.value)} />
                    <div className={styles.body}>
                        <p className={styles.pwitem}>비밀번호</p>
                        <input type="password" className={styles.inputstPw} maxLength={30} value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" />
                    </div>
                    {error && <p className={styles.errorMessage}>{error}</p>}
                    <div className={styles.loginbutton}>
                        <button onClick={goLoginMain} type="button" className={styles.loginb}>
                            로그인
                        </button>
                    </div>
                    <div className={styles.kakaologin}>
                        <button type="button" className={styles.kalogin}>
                            <img className={styles.kakao} src={kakao} alt="카카오톡 로고" />
                            카카오톡으로 간편 로그인
                        </button>
                    </div>
                    <div className={styles.menuButton}>
                        <button onClick={goSign} type="button" className={styles.registerItem}>
                            회원 가입
                        </button>
                        <p className={styles.slice}>|</p>
                        <button onClick={goFindId} type="button" className={styles.idsearchItem}>
                            아이디 찾기
                        </button>
                        <p className={styles.slice}>|</p>
                        <button onClick={goFindPw} type="button" className={styles.pwsearchItem}>
                            비밀번호 찾기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
