import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import styles from './changePsw.module.css'

const HOST_PORT = 'http://192.168.163.8:8080/'

const ChangePsw = () => {
    const navigate = useNavigate()
    const [nowPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleChangePassword = async () => {
        if (!nowPassword || !newPassword || !confirmPassword) {
            setError('모든 필드를 채워주세요.')
            return
        }

        if (newPassword !== confirmPassword) {
            setError('변경할 비밀번호와 확인 비밀번호가 일치하지 않습니다.')
            return
        }

        try {
            const token = sessionStorage.getItem('authToken')
            if (!token) {
                throw new Error('토큰이 없습니다. 다시 로그인해주세요.')
            }

            const response = await axios.put(
                `${HOST_PORT}profile/updatePassword`,
                {
                    nowPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.status === 200) {
                alert('비밀번호가 성공적으로 변경되었습니다.')
                navigate('/editProfile')
            }
        } catch (error) {
            console.error('비밀번호 변경 오류:', error)
            setError('비밀번호 변경 중 문제가 발생했습니다. 다시 시도해주세요.')
        }
    }

    return (
        <div className={styles.container}>
            <h1>비밀번호 변경</h1>
            <div className={styles.formGroup}>
                <label>현재 비밀번호</label>
                <input type="password" value={nowPassword} onChange={e => setCurrentPassword(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label>변경할 비밀번호</label>
                <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className={styles.input} />
            </div>
            <div className={styles.formGroup}>
                <label>변경할 비밀번호 확인</label>
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} className={styles.input} />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.button} onClick={handleChangePassword}>
                변경하기
            </button>
        </div>
    )
}

export default ChangePsw