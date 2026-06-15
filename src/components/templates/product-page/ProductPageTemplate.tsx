import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer/Footer";
import { Navbar } from "@/components/layout/navbar/Navbar";
import { ShellLayout } from "@/components/templates/shell-layout/ShellLayout";
import { FOOTER_CONFIG, HEADER_CONFIG, resolveLayoutShellOptions } from "@/constants/layoutConfig";

import styles from "./ProductPageTemplate.module.scss";

type ProductPageTemplateProps = {
  children: ReactNode;
  clientKey?: string;
};

export const ProductPageTemplate = ({ children, clientKey }: ProductPageTemplateProps) => {
  const shell = resolveLayoutShellOptions("shop", clientKey);

  return (
    <ShellLayout
      footer={shell.showFooter ? <Footer config={FOOTER_CONFIG} /> : undefined}
      header={shell.showHeader ? <Navbar config={HEADER_CONFIG} /> : undefined}
    >
      <main className={styles.container}>{children}</main>
    </ShellLayout>
  );
};
