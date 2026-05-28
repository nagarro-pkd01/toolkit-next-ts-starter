import type { FooterConfig } from "@/constants/layoutConfig";

import styles from "./Footer.module.scss";

type FooterProps = {
  config: FooterConfig;
};

export const Footer = ({ config }: FooterProps) => {
  return <footer className={styles.footer}>{config.copyright}</footer>;
};
