"use client"

import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import PostLayout from "@/app/components/layouts/PostLayout";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import { searchRecommends } from "@/app/lib/getRecommends";
import { PostData } from "@/app//lib/getMyPost";
import { likePost, unlikePost } from "./lib/getLikes";

export default function Home() {
    const [recommendPosts, setRecommendPosts] = useState<PostData[]>([]);
    
    useEffect(() => {
      const token = localStorage.getItem("token");
        if (!token) {
            redirect("/login");
        }

      const fetchPosts = async () => {
        try {
          const data = await searchRecommends();
            setRecommendPosts(data);
        } catch (error) {
          console.error("Failed to get reccomends", error);
        }
      };
      fetchPosts();
    }, []);

  return (
    <>
      <Title label="レコメンド" />
      {recommendPosts.length === 0 ? (
        <div className={styles.textContainer}>
          <p className={styles.statusMessage}>まだ投稿はありません</p>
        </div>
      ) : (
        recommendPosts.map((post) => (
          <div key={post.postid}>
            <PostLayout postData={post} setPosts={setRecommendPosts} posts={recommendPosts} showDeleteButton={false} />
          </div>
        ))
      )}
    </>
  );
}