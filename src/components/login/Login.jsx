import React, { useState } from 'react'
import logo from '../../img/simvroong.png'
import kakao from '../../img/Kakao_logo.png'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // axios 라이브러리 import

const Login = () => {
    const navigate = useNavigate()

    // 상태: 아이디, 비밀번호, 에러 메시지
    const [userId, setUserId] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // 서버와 통신하는 fetch API 함수
    const fetchLogin = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8080/auth/login', {
                userId,
                password
            })
            const token = response.data.token
            console.log(token)

            // 서버로부터의 성공 응답 처리
            if (response.status === 200) {
                localStorage.setItem('authToken', token)
                navigate('/MainPage') // 로그인 성공 시 메인 페이지로 이동
                console.log('로그인 성공')
            }
        } catch (error) {
            // 오류 처리
            if (error.response) {
                setError(error.response.data.message || '로그인에 실패했습니다.')
                console.log('로그인 실패')
            } else {
                setError('서버와 연결할 수 없습니다.')
            }
        }
    }

    // 로그인 버튼 클릭 시 실행
    const goLoginMain = () => {
        if (userId.trim() !== '' && password.trim() !== '') {
            fetchLogin() // 서버에 로그인 요청
        } else {
            alert('아이디 또는 비밀번호를 확인해주세요.')
        }
    }

    // 회원가입 클릭 시
    const goSign = () => {
        navigate('/Sign')
    }

    // 아이디 찾기 클릭 시
    const goFindId = () => {
        navigate('/FindId')
    }

    // 비밀번호 찾기 클릭 시
    const goFindPw = () => {
        navigate('/FindPw')
    }

    return (
        <div className="login-All">
            <div className="login-header">
                <img className="logo" src={logo} alt="Logo" />
            </div>
            <div className="all">
                <form className="body">
                    <p className="iditem">아이디</p>
                    <input type="text" className="inputst-id" placeholder="예) apple0000" maxLength={30} value={userId} onChange={e => setUserId(e.target.value)} />
                    <div className="body">
                        <p className="pwitem">비밀번호</p>
                        <input type="password" className="inputst-pw" maxLength={30} value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="loginbutton">
                        <button onClick={goLoginMain} type="button" className="loginb">
                            로그인
                        </button>
                    </div>
                    <div className="kakaologin">
                        <button type="button" className="kalogin">
                            <img className="kakao" src={kakao} alt="카카오톡 로고" />
                            카카오톡으로 간편 로그인
                        </button>
                    </div>
                    <div className="menu-button">
                        <button onClick={goSign} type="button" className="register-item">
                            회원 가입
                        </button>
                        <p className="slice">|</p>
                        <button onClick={goFindId} type="button" className="idsearch-item">
                            아이디 찾기
                        </button>
                        <p className="slice">|</p>
                        <button onClick={goFindPw} type="button" className="pwsearch-item">
                            비밀번호 찾기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
