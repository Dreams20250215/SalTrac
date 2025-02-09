import styles from "./Button.module.css"

type ButtonProps = {
    label: string;
};

function Button(props: ButtonProps) {
    const label = props.label

    return (
        <div className={styles.container}>
            <button className={styles.button}>{label}</button>
        </div>
    );
}

export default Button;