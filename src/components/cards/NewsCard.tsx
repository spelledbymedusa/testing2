import styles from "./NewsCard.module.css";

export function NewsCard({
  title,
  text,
  meta,
}: {
  title: string;
  text: string;
  meta: string;
}) {
  return (
    <article className={styles.card}>
      <div className={styles.image} />
      <div className={styles.body}>
        <div className={styles.meta}>{meta}</div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.text}>{text}</p>
      </div>
    </article>
  );
}

