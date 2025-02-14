import styles from "./ProfileLayout.module.css";
import { useState, useEffect } from "react";
import Button from "@/app/components/elements/Button";

type User = {
    userid: number;
    username: string;
    icon: string;
    post: number;
    follow: number;
    follower: number;
};

type ProfileProps = {
    profile: User;
};

export default function ProfileLayout({profile}: ProfileProps) {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={profile.icon} className={styles.userIcon} alt="usr-icon" />
                </div>
                <div className={styles.profileInfo}>
                    <h3>{`ユーザー名: ${profile.username}`}</h3>
                    <div className={styles.status}>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>ポスト</h3>
                            <p>{profile.post}</p>
                        </div>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>フォロー</h3>
                            <p>{profile.follow}</p>
                        </div>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>フォロワー</h3>
                            <p>{profile.follower}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}