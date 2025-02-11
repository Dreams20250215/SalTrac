import styles from "./Subtitle.module.css";

type Subtitle = {
    label: string;
};

export default function Subtitle(props: Subtitle) {
    const label = props.label

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>{label}</h2>
        </div>
    );
}