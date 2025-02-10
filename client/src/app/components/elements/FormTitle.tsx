import styles from "./FormTitle.module.css"

type FormTitleProps = {
    label: string;
};

export default function FormTitle(props: FormTitleProps) {
    const label = props.label

    return (
        <div className={styles.container}>
            <h2 className={styles.subTitle}>{label}</h2>
        </div>
    );
}
