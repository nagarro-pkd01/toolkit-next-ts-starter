import styles from "./PostsSkeleton.module.scss";

export const PostsSkeleton = () => {
  return (
    <div aria-busy="true" className={styles.skeleton} role="status">
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.lineShort} />
    </div>
  );
};
