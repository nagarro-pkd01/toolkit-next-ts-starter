import styles from "./Icon.module.scss";

type IconProps = {
  label: string;
};

export const Icon = ({ label }: IconProps) => {
  return <span className={styles.icon}>{label.slice(0, 1).toUpperCase()}</span>;
};
