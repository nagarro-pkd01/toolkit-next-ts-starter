import Link from "next/link";

import styles from "./NotFound.module.scss";

export default function NotFound() {
  return (
    <main className={styles.main}>
      <h1>Page not found</h1>
      <p>The route you requested does not exist.</p>
      <Link href="/">Go back home</Link>
    </main>
  );
}
