import type { ReactNode } from "react";
import styles from "./ShellLayout.module.scss";

type ShellLayoutProps = {
  children: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
};

export const ShellLayout = ({ children, footer, header }: ShellLayoutProps) => {
  return (
    <div className={styles.shell}>
      {header}
      <div className={styles.content}>{children}</div>
      {footer}
    </div>
  );
};
