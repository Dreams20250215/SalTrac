import styles from "./PostForm.module.css";
import { useState, ChangeEvent } from "react";
import { uploadPost, analyzeImage } from "@/app/lib/uploadPost";
import Button from "@/app/components/elements/Button";

export default function PostForm() {
    const [postImage, setPostImage] = useState("./no_image.png");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [text, setText] = useState("");
    const [salt, setSalt] = useState(0);

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setPostImage(imageUrl);
            setImageFile(file);
        }
    };

    const handleAnalyzeImage = async () => {
        if (!imageFile) {
            alert("画像を選択してください");
            return;
        }

        const formData = new FormData();
        formData.append("image", imageFile);

        const response = await analyzeImage(formData);
        if (response?.salt !== undefined) {
            setSalt(response.salt);
        } else {
            alert("画像認識に失敗しました");
        }
    };

    const handleUploadPost = async () => {
        if (!imageFile || !text || !salt) {
            alert("すべての項目を入力してください");
            return;
        }

        const formData = new FormData();

        formData.append("image", imageFile)
        formData.append("text", text);
        formData.append("salt", salt.toString());

        await uploadPost(formData);
    };

    return (
        <>
            <form>
                <div className={styles.container}>
                    <div className={styles.imageContainer}>
                        <img src={postImage} className={styles.postImage} alt="post-image" />
                    </div>
                    <div className={styles.textContainer}>
                        <textarea className={styles.sentence} value={text} placeholder="健康的な生活をシェアしよう...！" onChange={(e) => setText(e.target.value)}></textarea>
                        <div className={styles.infoContainer}>
                            <p className={styles.nutrition}>
                                塩分量: <input className={styles.saltMass}
                                            type="number" min={0}
                                            value={salt !== null ? salt : ""}
                                            onChange={(e) => setSalt(Number(e.target.value))}
                                        >
                                        </input> g
                            </p>
                            <button className={styles.MLButton} onClick={handleAnalyzeImage} type="button">画像認識</button>
                        </div>
                    </div>
                </div>
                <div className={styles.changeFile}>
                    <input type="file" accept=".jpg" onChange={handleChangeImage}/>
                </div>
                <Button onClick={handleUploadPost} label="投稿" />
            </form>
        </>
    );
}