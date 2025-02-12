"use client";

import { useState, useEffect } from "react";
import { searchUsers, User } from "@/app/lib/searchUsers";
import { profileData, ProfileInfo } from "@/app/lib/getProfile";
import { followUser } from "@/app/lib/followUser";
import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";

export default function Search() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [myProfile, setMyProfile] = useState<ProfileInfo | null>(null);
    const [followingUsers, setFollowingUsers] = useState<Set<string>>(new Set());

    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await profileData();
            if(profile) {
                setMyProfile(profile);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!searchQuery.trim()) {
                setUsers([]);
                return;
            }
            setLoading(true);
            const data = await searchUsers(searchQuery);
            setUsers(data);
            setLoading(false);
        };

        const debounce = setTimeout(fetchUsers, 500);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    const handleFollow = async (userId: string) => {
        if (!myProfile) return;
        const response = await followUser(userId);

        if (response.success && response.updatedFollowerCount !== undefined) {
            setFollowingUsers((prev) => new Set(prev).add(userId));

            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                        ? { ...user, follower: response.updatedFollowerCount ?? user.follower } : user
                )
            );
        } else {
            console.error("Failed to follow user.");
        }
    };

    return (
        <>
            <div className={styles.container}>
                <Title label="検索" />
                <input
                    type="text"
                    value={searchQuery}
                    placeholder="ユーザ名を入力して検索..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.input}
                />
            </div>
            {loading && <p>Loading...</p>}
            <ul className={styles.userList}>
                {users.map((user) => (
                    <li key={user.id} className={styles.userItem}>
                        <img src={user.icon} alt="アイコン" className={styles.userIcon} />
                        <div className={styles.userInfo}>
                            <span className={styles.username}>{user.username}</span>
                            <span className={styles.stats}>
                                Posts: {user.post} | Following: {user.follow} | Follower: {user.follower}
                            </span>
                        </div>
                        {myProfile?.id !== user.id && (
                            <button
                                onClick={() => handleFollow(user.id)}
                                className={`${styles.followButton} ${
                                    followingUsers.has(user.id) ? styles.followed : ""
                                }`}
                                disabled={followingUsers.has(user.id)}
                            >
                                {followingUsers.has(user.id) ? "Following" : "Follow"}
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
}