import type { ReactNode } from "react";

import styles from "./auth-layout.module.scss";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <main className={styles.layout}>{children}</main>;
};
