"use client";

import { useState, useEffect } from "react";
import { profileData, ProfileInfo } from "@/app/lib/getMyProfile";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import ProfileLayout from "@/app/components/layouts/ProfileLayout";

const defaultProfile: ProfileInfo = {
    userid: 0,
    username: "guest",
    icon: "./user_default.png",
    post: 0,
    follow: 0,
    follower: 0,
};

export default function Profile() {
    const [profile, setProfile] = useState(defaultProfile);

    useEffect(() => {
        const fetchProfile = async () => {
            const data = await profileData();
            setProfile(data ?? defaultProfile);
        };
        fetchProfile();
    }, []);

    return (
        <>
            <Title label="プロフィール" />
            <ProfileLayout profile={profile} />
        </>
    );
}