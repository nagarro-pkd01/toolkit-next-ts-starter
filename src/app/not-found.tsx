import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Page not found</h1>
      <p>The route you requested does not exist.</p>
      <Link href="/">Go back home</Link>
    </main>
  );
}
