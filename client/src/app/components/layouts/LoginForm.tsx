import styles from "./LoginForm.module.css"
import Button from "@/app/components/elements/Button"
import Subtitle from "@/app/components/elements/FormTitle"
import { useState } from "react";
import { loginUser } from "@/app/lib/getUser";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await loginUser(e, { username, password }, router);
    };

    return (
        <form className={styles.form} onSubmit={handleLogin}>
            <div className={styles.formElementsContainer}>
                <Subtitle label="ログイン" />
                <label className={styles.label}>username:</label>
                <input
                    name="username"
                    value={username}
                    placeholder="username"
                    className={styles.input}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label className={styles.label}>password:</label>
                <input
                    name="password"
                    value={password}
                    type="password"
                    placeholder="password"
                    className={styles.input}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button label="ログイン"/>
                <div className={styles.linkContainer}>
                    <a href="../signup">サインアップ</a>
                </div>
            </div>
        </form>
    );
}