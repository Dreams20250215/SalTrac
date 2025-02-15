import styles from "./ProfileLayout.module.css";
import { useState, useEffect } from "react";
import Button from "@/app/components/elements/Button";
import { checkFollowing, followUser } from "@/app/lib/followUser";

type User = {
    userid: number;
    username: string;
    icon: string;
    post: number;
    follow: number;
    follower: number;
};

type ProfileProps = {
    profile: User;
    loggedInUserId: number | null;
    token: string;
    onFollow?: () => void;
};

export default function ProfileLayout({ profile, loggedInUserId, token, onFollow }: ProfileProps) {
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
        if (profile.userid !== loggedInUserId) {
            checkFollowing(profile.userid.toString(), token).then(setIsFollowing);
        }
    }, [profile.userid, loggedInUserId]);

    const handleFollowUser = async () => {
        console.log("Sending follow request:", profile.userid.toString(), token);
        try {
            const response = await followUser(profile.userid.toString(), token);
            console.log("Follow response:", response);
            if (response.success) {
                setIsFollowing(response.following ?? false);
                if (onFollow) {
                    onFollow();
                }
            }
        } catch (error) {
            console.error("Follow request failed:", error);
        }
    };
    
    return (
        <>
            <div className={styles.container}>
                <div className={styles.imageContainer}>
                    <img src={profile.icon} className={styles.userIcon} alt="usr-icon" />
                </div>
                <div className={styles.profileInfo}>
                    <div className={styles.usernameContainer}>
                        <h3 className={styles.username}>{`ユーザー名: ${profile.username}`}</h3>
                        <div className={styles.followButtonContainer}>
                            {loggedInUserId !== profile.userid && (
                                <Button onClick={handleFollowUser} label={isFollowing ? "フォロー解除" : "フォロー"} />
                            )}
                        </div>
                    </div>
                    <div className={styles.status}>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>ポスト</h3>
                            <p>{profile.post}</p>
                        </div>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>フォロー</h3>
                            <p>{profile.follow}</p>
                        </div>
                        <div className={styles.itemContainer}>
                            <h3 className={styles.statusItem}>フォロワー</h3>
                            <p>{profile.follower}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}