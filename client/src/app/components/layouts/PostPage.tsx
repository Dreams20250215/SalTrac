import styles from "./PostPage.module.css";
import { useState, useEffect } from "react";
import { fetchPosts, postData, Post } from "@/app/lib/getPost";
import Button from "@/app/components/elements/Button";

export default function PostPage() {
    const [image, setImage] = useState<Blob | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [text, setText] = useState("");
    const [tags, setTags] = useState("");
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const loadPosts = async () => {
            try {
                const data = await fetchPosts();
                setPosts(data);
            } catch (error) {
                console.error(error);
            }
        }
        loadPosts();
    }, []);
    
    const handleSubmit = async () => {
        if (!image || !text) return;
        const formData = new FormData();
        formData.append("image", image);
        formData.append("text", text);
        formData.append("tags", tags);

        try {
            await postData(formData)
            alert("投稿しました");
            setText("");
            setTags("");
            setPreview(null);
            const updatedPosts = await fetchPosts();
            setPosts(updatedPosts);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.title}>投稿する</h1>
                <input type="file" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const reader = new FileReader();
                    reader.onload = (event) => {
                        if (!event.target || !event.target.result) return;

                        const img = new Image();
                        img.src = event.target.result as string;
                        img.onload = () => {
                            const canvas = document.createElement("canvas");
                            const size = Math.min(img.width, img.height);
                            canvas.width = canvas.height = size;
                            const ctx = canvas.getContext("2d");
                            if (ctx) {
                                ctx.drawImage(
                                    img,
                                    (img.width - size) / 2,
                                    (img.height - size) / 2,
                                    size,
                                    size,
                                    0,
                                    0,
                                    size,
                                    size
                                );
                                setPreview(canvas.toDataURL());
                                canvas.toBlob((blob) => setImage(blob), "image/jpeg");
                            }
                        };
                    };
                    reader.readAsDataURL(file);
                }} className={styles.subtitle} />
                {preview && <img src={preview} alt="preview" className={styles.preview} />}
                <div className={styles.textContainer}>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="投稿本文" className={styles.textarea} />
                </div>
                <div className={styles.textContainer}>
                    <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="タグ" className={styles.input} />
                </div>
                <Button onClick={handleSubmit} label="投稿" />

                <div>
                    {posts.map((post) => (
                        <div key={post.id} className={styles.post}>
                            <img src={post.image} alt="投稿画像" className={styles.image} />
                            <p>{post.text}</p>
                            <p className={styles.tags}>タグ: {post.tags}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}