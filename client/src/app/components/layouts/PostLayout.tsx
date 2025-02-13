import { useState, useEffect } from "react";
import { searchPosts, PostData } from "@/app/lib/getMyPost";
import styles from "./PostLayout.module.css";

type Post = {
    userid: number;
    postid: number;
    image: string;
    text: string;
    salt: number;
    icon?:string;
};

type PostProps = {
    postData: Post;
};

export default function PostLayout({postData}: PostProps) {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.imageFrame}>
                    <img src={postData.image} className={styles.postImage} alt="post-image" />
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.sentence}>{postData.text}</p>
                    <div className={styles.infoContainer}>
                        <p className={styles.nutrition}>{postData.salt}</p>
                        <img src={postData.icon} className={styles.userIcon} alt="user-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}