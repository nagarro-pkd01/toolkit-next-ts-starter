"use client";

import Script from "next/script";

import { getGoogleAnalyticsId } from "@/services/analytics/google-analytics";

export const GoogleAnalyticsProvider = () => {
  const measurementId = getGoogleAnalyticsId();

  if (!measurementId) {
    return null;
  }

  const serializedMeasurementId = JSON.stringify(measurementId);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag("js", new Date());
          gtag("config", ${serializedMeasurementId});
        `}
      </Script>
    </>
  );
};
