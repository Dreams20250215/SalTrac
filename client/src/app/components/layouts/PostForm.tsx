import styles from "./PostForm.module.css";
import { useState, ChangeEvent } from "react";
import { uploadPost } from "@/app/lib/uploadPost";
import Button from "@/app/components/elements/Button";

export default function PostForm() {
    const [postImage, setPostImage] = useState("./no_image.png");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [salt, setSalt] = useState("");

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPostImage(imageUrl);
            setImageFile(file);
        }
    };

    const handleUploadPost = async () => {
        if (!imageFile || !text || !salt) {
            alert("すべての項目を入力してください");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("text", text);
        formData.append("salt", salt);

        const response = await uploadPost(formData);
    };

    return (
        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.imageFrame}>
                        <img src={postImage} className={styles.postImage} alt="post-image" />
                    </div>
                    <div className={styles.textContainer}>
                        <textarea className={styles.sentence} value={text} placeholder="健康的な生活をシェアしよう...！" onChange={(e) => setText(e.target.value)}></textarea>
                        <p className={styles.nutrition}>
                            塩分量: <input className={styles.saltMass} type="number" value={salt} onChange={(e) => setSalt(e.target.value)}></input> g
                        </p>
                    </div>
                </div>
                <div className={styles.changeFile}>
                    <input type="file" accept="image/*" onChange={handleChangeImage}/>
                </div>
                <Button onClick={handleUploadPost} label="投稿" />
            </form>
        </>
    );
}