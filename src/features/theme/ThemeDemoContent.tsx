"use client";

import { Button } from "@/components/atoms/Button/Button";
import { ThemeToggle } from "@/components/molecules/ThemeToggle/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";

import styles from "./ThemeDemoPage.module.scss";

export const ThemeDemoContent = () => {
  const { preference, resolvedTheme } = useTheme();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Light / dark theme</h1>
        <p>
          Tokens live in <code>styles/design-system/theme/</code>. The active palette is applied via
          the <code>theme-dark</code> class on <code>&lt;html&gt;</code>.
        </p>
      </header>

      <ThemeToggle />

      <dl className={styles.meta}>
        <div>
          <dt>Preference</dt>
          <dd>{preference}</dd>
        </div>
        <div>
          <dt>Resolved</dt>
          <dd>{resolvedTheme}</dd>
        </div>
      </dl>

      <section aria-label="Theme preview" className={styles.previewGrid}>
        <article className={styles.surface}>
          <h2>Surface</h2>
          <p className={styles.muted}>Uses --color-background and --color-text.</p>
        </article>
        <article className={styles.card}>
          <h2>Card</h2>
          <p className={styles.muted}>Border and primary button pick up theme tokens.</p>
          <Button type="button">Primary action</Button>
        </article>
      </section>

      <section className={styles.tokens}>
        <h2>CSS variables</h2>
        <ul>
          <li>
            <span>--color-background</span>
          </li>
          <li>
            <span>--color-text</span>
          </li>
          <li>
            <span>--color-border</span>
          </li>
          <li>
            <span>--color-primary</span>
          </li>
          <li>
            <span>--color-muted</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
