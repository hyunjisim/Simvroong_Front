import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './editProfile.module.css'
import backb from '../../img/back-arrow.png'
import pencil from '../../img/pencil.png'
import axios from 'axios'

const HOST_PORT = 'http://127.0.0.1:8080/'

const EditProfile = () => {
    const navigate = useNavigate()

    const [nickname, setNickname] = useState('유딩규') // 사용자 별명
    const [isEditingNickname, setIsEditingNickname] = useState(false) // 닉네임 수정 상태
    const [phoneFirst, setPhoneFirst] = useState('') // 전화번호 앞자리
    const [phoneRest, setPhoneRest] = useState('') // 전화번호 뒷자리
    const [verifyCode, setVerifyCode] = useState('') // 인증번호 입력 필드
    const [isCodeSent, setIsCodeSent] = useState(false) // 인증번호 요청 상태
    const [isCodeVerified, setIsCodeVerified] = useState(false) // 인증 성공 상태
    const [isPhoneUpdated, setIsPhoneUpdated] = useState(false) // 전화번호 변경 여부
    const [isImageChanged, setIsImageChanged] = useState(false) // 이미지 변경 여부
    const [isPasswordChanged, setIsPasswordChanged] = useState(false) // 비밀번호 변경 여부
    const [isNicknameChanged, setIsNicknameChanged] = useState(false) // 닉네임 변경 여부
    const [newPassword, setNewPassword] = useState('') // 새로운 비밀번호
    const [uploadedFile, setUploadedFile] = useState(null) // 업로드된 파일 객체 상태
    const [profileImage, setProfileImage] = useState('https://res.cloudinary.com/dxvt4iugh/image/upload/v1735498268/aa_qwvdo9.png') // 프로필 이미지 URL 상태
    const [errorMessage, setErrorMessage] = useState('')

    const location = useLocation()

    useEffect(() => {
        if (location.state?.newPassword) {
            setNewPassword(location.state.newPassword)
            setIsPasswordChanged(true)
        }
    }, [location.state])

    useEffect(() => {
        const fetchNickname = async () => {
            try {
                const token = localStorage.getItem('authToken')
                if (!token) {
                    setErrorMessage('로그인이 필요합니다.')
                    return
                }

                const response = await axios.get(`${HOST_PORT}profile/getNickname`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response) {
                    setNickname(response.data.nickname)
                    setProfileImage(response.data.photoUrl)
                } else {
                    setErrorMessage('닉네임을 불러오지 못했습니다.')
                }
            } catch (error) {
                console.error('닉네임 불러오기 오류:', error)
                setErrorMessage('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
            }
        }

        fetchNickname()
    }, [])

    // 프로필 이미지 변경 핸들러
    const handleProfileImageChange = async e => {
        const file = e.target.files[0]
        if (file) {
            setUploadedFile(file) // 파일 객체 저장
            const imageUrl = URL.createObjectURL(file) // 파일 URL 생성
            setProfileImage(imageUrl) // 프로필 이미지 URL 업데이트
            setIsImageChanged(true)

            // Cloudinary에 업로드
            const formData = new FormData()
            formData.append('file', file)
            formData.append('upload_preset', 'ml_default') // Unsigned Preset 사용 (Cloudinary에서 설정)

            try {
                const token = localStorage.getItem('authToken')
                const response = await fetch('https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload', {
                    method: 'POST',
                    body: formData
                })

                const data = await response.json()
                console.log('Uploaded URL:', data.secure_url)

                // 업로드된 이미지 URL을 백엔드로 전송해 DB에 저장
                await fetch(`${HOST_PORT}profile/upload`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({ imageUrl: data.secure_url })
                })
            } catch (error) {
                console.error('이미지 업로드 실패:', error)
                alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.')
            }
        }
    }

    // 닉네임 수정 모드 전환
    const toggleNicknameEdit = () => {
        setIsEditingNickname(prev => !prev)
    }

    // 닉네임 변경 핸들러
    const handleNicknameChange = e => {
        setNickname(e.target.value)
        setIsNicknameChanged(true)
    }

    // 인증번호 요청
    const requestVerificationCode = async () => {
        const phoneNumber = `${phoneFirst}${phoneRest}`
        if (!phoneFirst || !phoneRest) {
            alert('휴대폰 번호를 입력해주세요.')
            return
        }

        try {
            await axios.post(`${HOST_PORT}auth/sendCode`, { phoneNumber })
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
            const response = await axios.post(`${HOST_PORT}auth/verifyCode`, {
                phoneNumber,
                code: verifyCode
            })
            if (response.data.success) {
                alert('인증이 완료되었습니다.')
                setIsPhoneUpdated(true) // 인증 성공 시 전화번호 변경 상태 업데이트
                setIsCodeVerified(true)
            } else {
                alert('인증번호가 올바르지 않습니다.')
            }
        } catch (error) {
            console.error('인증 실패:', error)
            alert('인증번호 확인에 실패했습니다. 다시 시도해주세요.')
        }
    }

    // 비밀번호 변경 페이지 이동
    const handlePasswordChange = () => {
        navigate('/changePsw', {
            state: { fromEditProfile: true }
        })
    }

    // 저장하기 버튼 핸들러
    const handleSave = async e => {
        e.preventDefault()
        try {
            const data = {}

            data.nickname = nickname
            data.phoneNumber = `${phoneFirst}${phoneRest}`

            const token = localStorage.getItem('authToken')

            const response = await axios.put(`${HOST_PORT}profile/userInfo/modifyInfo`, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            if (response) {
                alert('프로필 정보가 저장되었습니다.')
                navigate('/profile')
            }
        } catch (error) {
            alert('저장 실패. 다시 시도해주세요.')
        }
    }

    return (
        <div className={styles.container}>
            {/* 헤더 */}
            <div className={styles.header}>
                <img src={backb} alt="뒤로가기" className={styles.backIcon} onClick={() => navigate('/personalInfo')} />
            </div>

            {/* 프로필 이미지 변경 */}
            {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            <div className={styles.profile}>
                <div className={styles.profileImageContainer}>
                    <img src={profileImage} alt="유저 이미지" className={styles.profileImage} />
                    <label htmlFor="profileImageInput" className={styles.changeImageLabel}>
                        이미지 변경하기
                    </label>
                    <input type="file" id="profileImageInput" accept="image/*" className={styles.imageUpload} onChange={handleProfileImageChange} />
                </div>
                <div className={styles.nicknameContainer}>
                    {isEditingNickname ? (
                        <input className={styles.nicknameInput} value={nickname} onChange={handleNicknameChange} placeholder="별명을 입력하세요" onBlur={toggleNicknameEdit} />
                    ) : (
                        <>
                            <span className={styles.nickname}>{nickname}</span>
                            <img src={pencil} alt="닉네임 변경" className={styles.pencilButtonNickname} onClick={toggleNicknameEdit} />
                        </>
                    )}
                </div>
            </div>

            {/* 아이디 */}
            <div className={styles.formGroup1}>
                <label className={styles.labelid}>아이디</label>
                <input className={styles.input} value="apple0000" disabled />
            </div>

            {/* 전화번호 변경 */}
            <div className={styles.formGroup2}>
                <label className={styles.labelphone}>전화번호 변경</label>
                <div className={styles.phoneContainer}>
                    <select
                        className={styles.phoneFirst}
                        value={phoneFirst}
                        onChange={e => setPhoneFirst(e.target.value)}
                        disabled={isCodeVerified} // 인증 완료 시 비활성화
                    >
                        <option value="">앞자리 선택</option>
                        <option value="010">010</option>
                        <option value="011">011</option>
                    </select>
                    <span className={styles.dash}>-</span>
                    <input
                        className={styles.phoneRest}
                        type="text"
                        maxLength={8}
                        placeholder="8자리 입력"
                        value={phoneRest}
                        onChange={e => setPhoneRest(e.target.value)}
                        disabled={isCodeVerified} // 인증 완료 시 비활성화
                    />
                </div>
                <button
                    className={styles.changeButton_1}
                    onClick={requestVerificationCode}
                    disabled={isCodeVerified} // 인증 완료 후 버튼 비활성화
                >
                    {isCodeSent ? '인증번호 확인' : '인증번호 받기'}
                </button>
            </div>

            {/* 인증번호 입력 */}
            {isCodeSent && !isCodeVerified && (
                <div className={styles.formGroup3}>
                    <label className={styles.labelphone}>인증번호</label>
                    <input className={styles.input} type="text" value={verifyCode} onChange={e => setVerifyCode(e.target.value)} placeholder="인증번호 입력" />
                    <button className={styles.confirmButton} onClick={confirmVerificationCode}>
                        확인
                    </button>
                </div>
            )}

            {/* 비밀번호 변경 */}
            <div className={styles.formGroup}>
                <label className={styles.label}>비밀번호 변경</label>
                <button className={styles.changeButton} onClick={handlePasswordChange}>
                    비밀번호 변경
                </button>
                {isPasswordChanged && <p className={styles.successMessage}>변경 완료되었습니다!</p>}
            </div>

            {/* 저장 버튼 */}
            <button className={styles.saveButton} onClick={handleSave}>
                저장하기
            </button>
        </div>
    )
}

export default EditProfile