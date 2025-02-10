"use client";

import { useState, useEffect } from "react";
import { searchUsers, User } from "@/app/lib/searchUsers";
import styles from "./page.module.css";
import Subtitle from "@/app/components/elements/Subtitle";

export default function Search() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);

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

        const debounce = setTimeout(searchUsers, 500);
        return () => clearTimeout(debounce);
    }, [searchQuery]);

    return (
        <div className={styles.container}>
            <Subtitle label="検索" />
            <input
                type="text"
                value={searchQuery}
                placeholder="ユーザ名を入力して検索..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
            />
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
                    </li>
                ))}
            </ul>
        </div>
    );
}