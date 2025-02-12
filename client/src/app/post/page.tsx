"use client";

import styles from "./page.module.css";
import { useState } from "react";
import Title from "@/app/components/elements/Title";
import PostForm from "@/app/components/layouts/PostForm";


export default function Post() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const renderPost = () => {
        if (loading) {
            return <p className={styles.statusMessage}>読み込み中です...</p>;
        }
        if (posts.length === 0) {
            return <p className={styles.statusMessage}>まだ投稿はありません</p>;
        }
    };

    return (
        <>
            <Title label="投稿する" />
            <PostForm />
            <Title label="投稿一覧" />
            <div className={styles.container}>{renderPost()}</div>
        </>
    );
}