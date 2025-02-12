import styles from "./PostForm.module.css";
import { useState, useEffect } from "react";
import { fetchPosts, postData, Post } from "@/app/lib/getPost";
import Button from "@/app/components/elements/Button";

export default function PostForm() {
    const [postImage, setPostImage] = useState("./no-image.png");

    return (
        <>
            <form>
                <div className={styles.formContainer}>
                    <div className={styles.imageFrame}>
                        <img src={ postImage } className={styles.postImage} alt="post-image" />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.sentence}>健康的な生活をシェアしよう...!</p>
                        <p className={styles.nutrition}>塩分量: g</p>
                    </div>
                </div>
                <div className={styles.changeFile}>
                    <input type="file" name="photo"/>
                </div>
            </form>
            <Button label="投稿" />
        </>
    );
}