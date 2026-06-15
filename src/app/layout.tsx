import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/app/providers";
import { ENV } from "@/constants/envConfig";
import { GoogleAnalyticsProvider } from "@/providers/GoogleAnalyticsProvider";
import "@/styles/globals.scss";
import { themeInitScript } from "@/utils/theme/theme-init-script";

// TODO: Replace the starter metadata before production:
// 1. Set NEXT_PUBLIC_APP_NAME and NEXT_PUBLIC_BASE_URL to the deployed application values.
// 2. Replace the title, description, and Open Graph details with product-specific content.
// 3. Set robots.index and robots.follow to true only when the production site should be discoverable.
export const metadata: Metadata = {
  metadataBase: new URL(ENV.baseUrl),
  applicationName: ENV.appName,
  title: {
    default: ENV.appName,
    template: `%s | ${ENV.appName}`,
  },
  description: "Replace this starter description with a concise summary of the application.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: ENV.appName,
    title: ENV.appName,
    description: "Replace this starter description with a concise summary of the application.",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
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
        <GoogleAnalyticsProvider />
      </body>
    </html>
  );
}
