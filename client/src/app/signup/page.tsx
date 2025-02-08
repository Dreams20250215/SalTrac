"use client";

import { useState } from "react"
import styles from "./Signup.module.css"

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: ""});
    const [message, setMessage] = useState("");

    return (
        <div>
            <h2 className={styles.title}>サインアップ</h2>
            <form className={styles.form}>
                <div className={styles.container}>
                    <label className={styles.label}>Email address:</label>
                    <input name="Email address" type="email" placeholder="user@example.com" className={styles.input} />
                    <label className={styles.label}>username:</label>
                    <input name="username" placeholder="username" className={styles.input} />
                    <label className={styles.label}>password:</label>
                    <input name="password" type="password" placeholder="password" className={styles.input} />
                    <button type="submit" className={styles.button}>サインアップ</button>
                </div>
            </form>
        </div>
    );
}