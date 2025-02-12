import styles from "./Title.module.css";

type Title = {
    label: string;
};

export default function Subtitle(props: Title) {
    const label = props.label

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{label}</h1>
        </div>
    );
}