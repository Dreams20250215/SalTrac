"use client";

import { useState, useEffect } from "react";
import { searchUsers, User } from "@/app/lib/searchUsers";
import { redirect } from "next/navigation";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import ProfileLayout from "@/app/components/layouts/ProfileLayout";

export default function Search() {
    const [searchQuery, setSearchQuery] = useState("");
    const [userProfiles, setUserProfiles] = useState<User[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
            if (!token) {
                redirect("/login");
            }

        const fetchUsers = async () => {
            const data = await searchUsers(searchQuery);
            if(data) {
                setUserProfiles(data);
            }
        };
        fetchUsers();
    }, [searchQuery]);

    const handleChangeQuery = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

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
                <div key={profile.userid} className={styles.profileContainer}>
                    <ProfileLayout profile={profile} />
                </div>
            ))}
        </>
    );
}