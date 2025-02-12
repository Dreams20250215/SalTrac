"use client";

import { useState, useEffect } from "react";
import { profileData, ProfileInfo } from "@/app/lib/getProfile";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";

export default function Profile() {
    const [profile, setProfile] = useState<ProfileInfo | void | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            const data = await profileData();
            setProfile(data);
            setLoading(false);
        };
        getProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>Profile not found.</p>;

    return (
        <>
            <Title label="プロフィール" />
            <div className={styles.container}>
                <img src={profile.icon} alt={profile.username} className={styles.profileImage} />
                <p className={styles.username}>{profile.username}</p>
                <p className={styles.stats}>
                    Following: {profile.follow} | Follower: {profile.follower}
                </p>
            </div>
        </>
    );
}