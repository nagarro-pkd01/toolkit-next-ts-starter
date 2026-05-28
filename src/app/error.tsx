"use client";

import { useEffect } from "react";

import { logger } from "@/lib/logger/logger";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    logger.error("Unhandled route error", {
      digest: error.digest,
      message: error.message,
      name: error.name,
    });
  }, [error]);

  return (
    <div style={{ padding: 24 }}>
      <h2>Something went wrong !</h2>
      <button onClick={reset} type="button">
        Retry
      </button>
    </div>
  );
}
