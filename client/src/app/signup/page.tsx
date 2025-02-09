"use client";

import { useState } from "react"
import styles from "./Signup.module.css"
import Button from "@/app/components/elements/Button"
import Subtitle from "@/app/components/elements/Subtitle"

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: ""});
    const [message, setMessage] = useState("");

    return (
        <>
            <form className={styles.form}>
                <div className={styles.formElementsContainer}>
                    <Subtitle label="サインアップ" />
                    <label className={styles.label}>Email address:</label>
                    <input name="Email address" type="email" placeholder="user@example.com" className={styles.input} />
                    <label className={styles.label}>username:</label>
                    <input name="username" placeholder="username" className={styles.input} />
                    <label className={styles.label}>password:</label>
                    <input name="password" type="password" placeholder="password" className={styles.input} />
                    <Button label="サインアップ"/>
                    <div className={styles.linkContainer}>
                        <a href="../login">ログイン</a>
                    </div>
                </div>
            </form>
        </>
    );
}