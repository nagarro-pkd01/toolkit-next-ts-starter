import type { ReactNode } from "react";

import { ShellLayout } from "@/components/templates/shell-layout/ShellLayout";

import styles from "./ProductPageTemplate.module.scss";

type ProductPageTemplateProps = {
  children: ReactNode;
  clientKey?: string;
};

export const ProductPageTemplate = ({ children, clientKey }: ProductPageTemplateProps) => {
  return (
    <ShellLayout clientKey={clientKey} layoutId="shop">
      <main className={styles.container}>{children}</main>
    </ShellLayout>
  );
};
