import type { ReactNode } from "react";

import { Footer } from "@/components/organisms/footer/Footer";
import { Navbar } from "@/components/organisms/navbar/Navbar";
import {
  FOOTER_CONFIG,
  HEADER_CONFIG,
  type LayoutShellId,
  resolveLayoutShellOptions,
} from "@/constants/layoutConfig";

import styles from "./ShellLayout.module.scss";

type ShellLayoutProps = {
  children: ReactNode;
  clientKey?: string;
  layoutId: LayoutShellId;
};

export const ShellLayout = ({ children, clientKey, layoutId }: ShellLayoutProps) => {
  const shell = resolveLayoutShellOptions(layoutId, clientKey);

  return (
    <div className={styles.shell}>
      {shell.showHeader ? <Navbar config={HEADER_CONFIG} /> : null}
      <div className={styles.content}>{children}</div>
      {shell.showFooter ? <Footer config={FOOTER_CONFIG} /> : null}
    </div>
  );
};
