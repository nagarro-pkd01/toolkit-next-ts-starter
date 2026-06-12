"use client";

import { useEffect } from "react";

import { logger } from "@/utils/logger";

import styles from "./GlobalError.module.scss";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error("ui.error_boundary", "Unhandled route error", error, {
      digest: error.digest,
      route: window.location.pathname,
    });
  }, [error]);

  return (
    <div className={styles.container}>
      <h2>Something went wrong !!!</h2>
      <button onClick={reset} type="button">
        Retry
      </button>
    </div>
  );
}
