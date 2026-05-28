import type { ReactNode } from "react";

import { ShellLayout } from "@/components/templates/shell-layout/ShellLayout";

import styles from "./AuthLayout.module.scss";

type AuthLayoutProps = {
  children: ReactNode;
  clientKey?: string;
};

export const AuthLayout = ({ children, clientKey }: AuthLayoutProps) => {
  return (
    <ShellLayout clientKey={clientKey} layoutId="auth">
      <main className={styles.layout}>{children}</main>
    </ShellLayout>
  );
};
