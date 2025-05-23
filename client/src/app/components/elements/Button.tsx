import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css"

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export default function Button({ children, ...props }: Props) {

  return (
    <div className={styles.container}>
      <button className={styles.button} {...props} >
        {children}
      </button>
    </div>
  );
}