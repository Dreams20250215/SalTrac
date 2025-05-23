import styles from "./SignupForm.module.css"
import Button from "@/app/components/elements/Button"
import FormTitle from "@/app/components/elements/FormTitle";
import { useState } from "react";
import { signupUser } from "@/app/lib/getUser";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signupUser(e, { email, username, password }, router);
  };

  return (
    <form className={styles.form} onSubmit={handleSignup}>
      <div className={styles.formElementsContainer}>
        <FormTitle label="サインアップ" />
        <label className={styles.label}>Email address:</label>
        <input
          name="Email address"
          value={email}
          type="email"
          placeholder="user@example.com"
          className={styles.input}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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
        <Button>サインアップ</Button>
        <div className={styles.linkContainer}>
          <a href="../login">ログイン</a>
        </div>
      </div>
    </form>
  );
}