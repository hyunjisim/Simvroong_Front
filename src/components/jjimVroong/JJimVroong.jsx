import React, { useState, useEffect } from "react";
import styles from "./JJimVroong.module.css";
import backb from "../../img/back-arrow.png";
import panda from "../../img/panda.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const JJimVroong = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]); // 찜 목록 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태

     // 백엔드에서 찜 목록 데이터를 가져오는 함수
     const fetchJJimItems = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("토큰이 없습니다. 다시 로그인해주세요.");

            const response = await axios.get("http://127.0.0.1:8080/favorites", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setItems(response.data); // 데이터 설정
        } catch (error) {
            console.error("찜 목록 불러오기 실패:", error);
            setItems([]); // 실패 시 빈 배열 설정
        } finally {
            setLoading(false); // 로딩 완료
        }
    };

    useEffect(() => {
        fetchJJimItems();
    }, []);

    // 하트 취소 함수
    const handleUnlike = async (id) => {
        const confirmed = window.confirm("정말 이 찜 내용을 취소하겠습니까?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`http://127.0.0.1:8080/favorites/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // 로컬 상태 업데이트
            const updatedItems = items.filter((item) => item.id !== id);
            setItems(updatedItems);

            // 목록이 비어 있으면 JJimVroongnone으로 이동
            if (updatedItems.length === 0) {
                navigate("/jjimvroongnone");
            }
        } catch (error) {
            console.error("찜 취소 실패:", error);
            alert("찜 취소에 실패했습니다. 다시 시도해주세요.");
        }
    };

     // 찜 목록이 없는 경우 JJimVroongnone 페이지로 이동
     useEffect(() => {
        if (!loading && items.length === 0) {
            navigate("/jjimvroongnone");
        }
    }, [loading, items, navigate]);

    // 로딩 중 화면
    if (loading) {
        return <div>로딩 중입니다...</div>;
    }

    // 찜 목록 화면
    return (
        <div className={styles.jjimvroongcontainer}>
            <div className={styles.jjimvroongheader}>
                <img src={backb} alt="뒤로가기" className={styles.backb} onClick={() => navigate("/profile")} />
                <h3 className={styles.jjimvroongtitle}>찜부릉</h3>
            </div>
            <div className={styles.jjimvroonglist}>
                {items.map((item) => (
                    <div key={item.id} className={styles.jjimvroongitem}>
                        <img src={panda} alt="유저 이미지" className={styles.userImage} />
                        <div className={styles.itemDetails}>
                            <h4 className={styles.itemTitle}>{item.title}</h4>
                            <p className={styles.itemInfo}>
                                {item.location} · {item.time}
                            </p>
                            <p className={styles.itemPrice}>{item.price}</p>
                        </div>
                        <div className={styles.itemActions}>
                            <button className={styles.chat}>💬 {item.chat}</button>
                            <button
                                className={styles.heartButton}
                                onClick={() => handleUnlike(item.id)}
                            >
                                ❤️
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JJimVroong;
