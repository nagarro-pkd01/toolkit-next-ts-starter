import type { ReactNode } from "react";

import { Footer } from "@/components/organisms/footer/footer";
import { Navbar } from "@/components/organisms/navbar/navbar";
import styles from "./product-page.module.scss";

type ProductPageTemplateProps = {
  children: ReactNode;
};

export const ProductPageTemplate = ({ children }: ProductPageTemplateProps) => {
  return (
    <main className={styles.container}>
      <Navbar />
      <section>{children}</section>
      <Footer />
    </main>
  );
};
