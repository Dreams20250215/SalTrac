"use client";

import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { searchPosts, PostData } from "@/app/lib/getMyPost";
import Title from "@/app/components/elements/Title";
import PostForm from "@/app/components/layouts/PostForm";
import PostLayout from "@/app/components/layouts/PostLayout";

export default function Post() {
    const [myPosts, setMyPosts] = useState<PostData[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
            if (!token) {
                redirect("/login");
            }

        const fetchPosts = async () => {
            try {
                const postsData = await searchPosts();
                setMyPosts(postsData);
            } catch (error) {
                console.error("Failed to get post", error);
            }
        }
        fetchPosts();
    }, []);

    return (
        <>
            <Title label="投稿する" />
            <PostForm />
            <Title label="投稿一覧" />
            {myPosts.length === 0 ? (
                <div className={styles.textContainer}>
                    <p className={styles.statusMessage}>まだ投稿はありません</p>
                </div>
            ) : (
                myPosts.map((post) => (
                    <div key={post.postid}>
                        <PostLayout postData={post} />
                    </div>
                ))
            )}
        </>
    );
}