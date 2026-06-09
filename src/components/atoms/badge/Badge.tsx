import styles from "./Badge.module.scss";

type BadgeProps = {
  label: string;
};

export const Badge = ({ label }: BadgeProps) => {
  return <span className={styles.badge}>{label}</span>;
};
