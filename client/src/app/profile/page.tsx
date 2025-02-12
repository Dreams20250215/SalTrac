"use client";

import { useState, useEffect } from "react";
import { profileData, ProfileInfo } from "@/app/lib/getMyProfile";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";

export default function Profile() {
    const [icon, setIcon] = useState("./user_default.png");

    return (
        <>
            <Title label="プロフィール" />
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={icon} className={styles.userIcon} alt="usr-icon" />
                </div>
                <div className={styles.profileInfo}>
                    <h3>ユーザー名: guest</h3>
                    <div className={styles.status}>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>ポスト</h3>
                            <p>3</p>
                        </div>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>フォロー</h3>
                            <p>3</p>
                        </div>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>フォロワー</h3>
                            <p>3</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}