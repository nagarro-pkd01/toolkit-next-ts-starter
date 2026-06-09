import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/app/providers";
import "@/styles/globals.scss";
import { themeInitScript } from "@/utils/theme/theme-init-script";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
