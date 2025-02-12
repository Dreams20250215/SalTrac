import styles from "./Post.module.css";
import { useState } from "react";

export default function Post() {
    const [profileImage, setProfileImage] = useState("./no-image.png");

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.imageFrame}>
                    <img src={ profileImage } className={styles.postImage} alt="post-image" />
                </div>
                <div className={styles.textContainer}>
                    <p className={styles.sentence}>健康的な生活をシェアしよう...!</p>
                    <div className={styles.infoContainer}>
                        <p className={styles.nutrition}>塩分量: g</p>
                        <img src="./user_default.png" className={styles.userIcon} alt="user-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}