import styles from "./Post.module.css";
import { useState, useEffect } from "react";
import { fetchPosts, PostData } from "@/app/lib/getMyPost";

export default function Post() {
    const [postImage, setPostImage] = useState("./no_image.png");
    const [userIcon, setUserIcon] = useState("./user_default.png");
    const [post, setPost] = useState<PostData[]>([]);

    useEffect(() => {
        const handleGetPost = async () => {
            try {
                const postData = await fetchPosts();
                setPost(postData);
            } catch (error) {
                console.error("Failed to get post", error);
                setPost([
                    {
                        userid: 1,
                        postid: 101,
                        image: "./no_image.png",
                        text: "初めての投稿です！",
                        salt: 12345
                    },
                    {
                        userid: 2,
                        postid: 102,
                        image: "https://example.com/image2.jpg",
                        text: "これは2つ目の投稿",
                        salt: 67890
                    }
                ]);
            }
        }
        handleGetPost();
    }, []);

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.imageFrame}>
                    <img src={ postImage } className={styles.postImage} alt="post-image" />
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.sentence}>{post.length > 0 ? post[0].text : "投稿がありません"}</p>
                    <div className={styles.infoContainer}>
                        <p className={styles.nutrition}>{}</p>
                        <img src={ userIcon } className={styles.userIcon} alt="user-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}