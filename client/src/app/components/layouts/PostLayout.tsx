import styles from "./PostLayout.module.css";
import { deletePost } from "@/app/lib/getMyPost";

type Post = {
    userid: number;
    postid: number;
    image: string;
    text: string;
    salt: number;
    username?: string;
    icon: string;
};

type PostProps = {
    postData: Post;
    setMyPosts?: React.Dispatch<React.SetStateAction<Post[]>>
    myPosts?: Post[];
    showDeleteButton?: boolean;
};

export default function PostLayout({ postData, setMyPosts, myPosts, showDeleteButton  = true }: PostProps) {
    const handleDeletePost = async () => {
        if (!setMyPosts || !myPosts) return;
        try {
            await deletePost(postData.postid);
            setMyPosts(myPosts.filter(post => post.postid !== postData.postid));
        } catch (error) {
            console.error("Failed to delete post", error);
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
                        {showDeleteButton && (
                            <span onClick={handleDeletePost} className={styles.deleteButton}></span>
                        )}
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