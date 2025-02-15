import styles from "./PostLayout.module.css";
import { deletePost } from "@/app/lib/getMyPost";
import { useState, useEffect } from "react";
import { likePost, unlikePost } from "@/app/lib/getLikes";

type Post = {
    userid: number;
    postid: number;
    image: string;
    text: string;
    salt: number;
    username?: string;
    icon: string;
    likes: number;
    likedByCurrentUser: boolean;
};

type PostProps = {
    postData: Post;
    setMyPosts?: React.Dispatch<React.SetStateAction<Post[]>>
    myPosts?: Post[];
    showDeleteButton?: boolean;
    onLike?: (postId: number, liked: boolean) => void;
};

export default function PostLayout({ postData, setMyPosts, myPosts, showDeleteButton = true }: PostProps) {
    const [liked, setLiked] = useState(postData.likedByCurrentUser);
    const [likesCount, setLikesCount] = useState(postData.likes);

    useEffect(() => {
        setLikesCount(postData.likes);
        setLiked(postData.likedByCurrentUser);
    }, [postData]);

    const handleDeletePost = async () => {
        if (!setMyPosts || !myPosts) return;
        try {
            await deletePost(postData.postid);
            setMyPosts(myPosts.filter(post => post.postid !== postData.postid));
        } catch (error) {
            console.error("Failed to delete post", error);
        }
    };

    const handleLikePost = async () => {
        if (!setMyPosts || !myPosts) return;
        try {
            let newLikedState = !liked;
            let newLikesCount = likesCount;
    
            if (liked) {
                const response = await unlikePost(postData.postid);
                newLikesCount = response.likes;
            } else {
                const response = await likePost(postData.postid);
                newLikesCount = response.likes;
            }
    
            setLiked(newLikedState);
            setLikesCount(newLikesCount);
    
            setMyPosts(myPosts.map(post =>
                post.postid === postData.postid
                    ? { ...post, likes: newLikesCount, likedByCurrentUser: newLikedState }
                    : post
            ));
        } catch (error) {
            console.error("Failed to like/unlike post", error);
        }
    };
    

    return (
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
                    <button onClick={handleLikePost} className={styles.likeButton}>
                        {liked ? "💛" : "💙"} {likesCount}
                    </button>
                    <img src={postData.icon} className={styles.userIcon} alt="user-icon" />
                </div>
            </div>
        </div>
    );
}
