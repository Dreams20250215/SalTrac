import styles from "./PostForm.module.css";
import { useState, useEffect } from "react";
import { fetchPosts, postData, Post } from "@/app/lib/getPost";
import Title from "@/app/components/elements/Title";
import Button from "@/app/components/elements/Button";

export default function PostForm() {

    return (
        <>
            <Title label="投稿する" />
            <form>
                <div className={styles.formContainer}>
                    <div className={styles.imageFrame}></div>
                    <div className={styles.textContainer}>
                        <p className={styles.sentence}>本文</p>
                        <p className={styles.nutrition}>塩分量: g</p>
                    </div>
                </div>
                <div className={styles.changeFile}>
                    <input type="file" name="photo"/>
                </div>
            </form>
        </>
    );
}