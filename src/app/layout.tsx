import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Toolkit Next TS Enterprise Starter",
  description: "Next.js App Router with layered src architecture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
