import styles from "./PostForm.module.css";
import { useState, useEffect, ChangeEvent } from "react";
import { fetchPosts, postData, Post } from "@/app/lib/getMyPost";
import Button from "@/app/components/elements/Button";

export default function PostForm() {
    const [postImage, setPostImage] = useState("./no-image.png");
    const [prev, setPrev] = useState(false);

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPostImage(imageUrl);
        }
    };

    return (
        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.imageFrame}>
                        <img src={ postImage } className={styles.postImage} alt="post-image" />
                    </div>
                    <div className={styles.textContainer}>
                        <p className={styles.sentence}>健康的な生活をシェアしよう...!</p>
                        <p className={styles.nutrition}>塩分量: g</p>
                    </div>
                </div>
                <div className={styles.changeFile}>
                    <input type="file" accept="image/*" onChange={handleChangeImage}/>
                </div>
            </form>
            <Button label="投稿" />
        </>
    );
}