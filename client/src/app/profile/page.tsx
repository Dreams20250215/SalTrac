"use client";

import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { profileData, ProfileData } from "@/app/lib/getMyProfile";
import { logoutUser } from "@/app/lib/getUser";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import ProfileLayout from "@/app/components/layouts/ProfileLayout";
import Button from "@/app/components/elements/Button";

const defaultProfile: ProfileData = {
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
    const token = localStorage.getItem("token");
    if (!token) {
      redirect("/login");
    }

    const fetchProfile = async () => {
      const data = await profileData();
      setProfile(data ?? defaultProfile);
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logoutUser();
  };

  return (
    <>
      <Title label="プロフィール" />
      <ProfileLayout profile={profile} loggedInUserId={profile.userid} token="token" />
      <Button onClick={handleLogout} label="ログアウト" />
    </>
  );
}