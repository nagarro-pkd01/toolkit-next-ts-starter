import type { RenderingStrategyId } from "@/types/renderingTypes";

import styles from "./RenderingMeta.module.scss";

type RenderingMetaProps = {
  configHint: string;
  description: string;
  fetchedAt?: string;
  strategy: RenderingStrategyId;
  title: string;
};

export const RenderingMeta = ({
  configHint,
  description,
  fetchedAt,
  strategy,
  title,
}: RenderingMetaProps) => {
  return (
    <header className={styles.meta}>
      <span className={styles.badge}>{strategy.toUpperCase()}</span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <p className={styles.hint}>
        <strong>Config:</strong> {configHint}
      </p>
      {fetchedAt ? (
        <p className={styles.timestamp}>
          <strong>Fetched at:</strong> {fetchedAt}
        </p>
      ) : null}
    </header>
  );
};
