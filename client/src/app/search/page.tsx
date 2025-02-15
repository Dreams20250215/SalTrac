"use client";

import { useState, useEffect } from "react";
import { searchUsers, User } from "@/app/lib/searchUsers";
import { profileData } from "@/app/lib/getMyProfile";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import ProfileLayout from "@/app/components/layouts/ProfileLayout";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [userProfiles, setUserProfiles] = useState<User[]>([]);
    const [token, setToken] = useState<string | null>(null);
    const [loggedInUserId, setLoggedInUserId] = useState<number | null>(null);
    const [followTrigger, setFollowTrigger] = useState(0);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
            redirect("/login");
        }

        setToken(storedToken);

        const fetchProfile = async () => {
            const myProfile = await profileData();
            if (myProfile) {
                setLoggedInUserId(myProfile.userid);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (!token) return;
        const fetchUsers = async () => {
            const data = await searchUsers(searchQuery);
            if (data) {
                setUserProfiles(data);
            }
        };
        fetchUsers();
    }, [searchQuery, token, followTrigger]);

    const handleChangeQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    if (!token) return null;

    return (
        <>
            <div className={styles.container}>
                <Title label="検索" />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="ユーザ名を入力して検索..."
                    onChange={handleChangeQuery}
                    className={styles.input}
                />
            </div>
            {userProfiles.map((profile) => (
                <div key={`${profile.userid}-${followTrigger}`} className={styles.profileContainer}>
                    <ProfileLayout
                        profile={profile}
                        loggedInUserId={loggedInUserId}
                        token={token}
                        onFollow={() => setFollowTrigger((prev) => prev + 1)}
                    />
                </div>
            ))}
        </>
    );
}