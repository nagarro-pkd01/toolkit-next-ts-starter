import type { Metadata } from "next";
import { Providers } from "@/app/providers";
import "@/app/globals.scss";

export const metadata: Metadata = {
  title: "Toolkit Next TS Enterprise Starter",
  description: "Routing-only App Router with feature-first module architecture",
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
