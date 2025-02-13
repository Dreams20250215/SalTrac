"use client"

import styles from "./page.module.css";
import Title from "@/app/components/elements/Title";
import PostLayout from "@/app/components/layouts/PostLayout";
import { useState, useEffect } from "react";
import { searchRecommends } from "@/app/lib/getRecommends";
import { PostData } from "@/app//lib/getMyPost";

export default function Home() {
  const samplePostData = [
    {userid: 1, postid: 1, image:"./no_image.png", text:"昼ごはん！", salt: 5, username: "User", icon:"./user_default.png"},
    ];

    const [recommendPosts, setRecommendPosts] = useState<PostData[]>(samplePostData);
    
    useEffect(() => {
      const fetchPosts = async () => {
        const data = await searchRecommends();
        if(data) {
          setRecommendPosts(data);
        } else {
          setRecommendPosts(samplePostData);
        }
      };
      fetchPosts();
    }, []);
    console.log(recommendPosts);

  return (
    <>
      <Title label="レコメンド" />
      {recommendPosts.map((post) => (
        <div key={post.postid} className={styles.postContainer}>
          <PostLayout postData={post} />
        </div>
      ))}
    </>
  );
}
