import styles from "./Subtitle.module.css"

type SubtitleProps = {
    label: string;
};

function Subtitle(props: SubtitleProps) {
    const label = props.label

    return (
        <div className={styles.container}>
            <h2 className={styles.subtitle}>{label}</h2>
        </div>
    );
}

export default Subtitle;