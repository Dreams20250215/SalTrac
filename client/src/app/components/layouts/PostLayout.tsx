import styles from "./PostLayout.module.css";
import { deletePost } from "@/app/lib/getMyPost";

type Post = {
    userid: number;
    postid: number;
    image: string;
    text: string;
    salt: number;
    username?: string;
    icon?: string;
};

type PostProps = {
    postData: Post;
};

export default function PostLayout({postData}: PostProps) {
    const handleDeletePost = async () => {
        try {
            const response = await deletePost(postData.postid)
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.imageFrame}>
                    <img src={postData.image} className={styles.postImage} alt="post-image" />
                </div>
                <div className={styles.textContainer}>
                    <div className={styles.wrapper}>
                        <p className={styles.username}>{postData.username}</p>
                        <span onClick={handleDeletePost} className={styles.deleteButton}></span>
                    </div>
                    <p className={styles.sentence}>{postData.text}</p>
                    <div className={styles.infoContainer}>
                        <p className={styles.nutrition}>塩分量: {postData.salt} g</p>
                        <img src={postData.icon} className={styles.userIcon} alt="user-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};