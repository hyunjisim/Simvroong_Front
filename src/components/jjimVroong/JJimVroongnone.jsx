import React from "react";
import styles from './JJimVroongnone.module.css';
import backb from "../../img/back-arrow.png";
import sad from "../../img/sad.png";
import { useNavigate } from "react-router-dom";

const JJimVroongnone = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.jjimvroongcontainer}>
            {/* 헤더 */}
            <div className={styles.jjimvroongheader}>
                <img
                    src={backb}
                    alt="뒤로가기"
                    className={styles.backIcon}
                    onClick={() => navigate('/profile')}
                />
                <h3 className={styles.jjimvroongtitle}>찜부릉</h3>
            </div>

            {/* 내용 */}
            <div className={styles.chatListContainer}>
                <div className={styles.detail}>
                    <img src={sad} alt="슬픈 이모티콘" className={styles.sadIcon} />
                    <span className={styles.emptyMessage}>아직 찜 내역이 없어요</span>
                </div>
            </div>
        </div>
    );
};

export default JJimVroongnone;
