"use client";

import { useState, useEffect } from "react";
import { profileData, ProfileData } from "@/app/lib/getProfile";
import styles from "./page.module.css";
import Subtitle from "@/app/components/elements/Subtitle";

export default function Profile() {
    const [profile, setProfile] = useState<ProfileData | void | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProfile = async () => {
            const data = await getProfile();
            setProfile(data);
            setLoading(false);
        };
        getProfile();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (!profile) return <p>Profile not found.</p>;

    return (
        <>
            <Subtitle label="プロフィール" />
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