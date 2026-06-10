import type {
  AnalyticsEventMap,
  AnalyticsEventName,
  AnalyticsEventParameters,
} from "@/services/analytics/analytics-types";

type GoogleAnalyticsWindow = Window & {
  gtag?: (command: "event", eventName: string, parameters?: AnalyticsEventParameters) => void;
};

const GOOGLE_ANALYTICS_ID_PATTERN = /^G-[A-Z0-9]+$/;

export const getGoogleAnalyticsId = (): string | undefined => {
  const measurementId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;
  const isEnabled = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ENABLED === "true";

  if (!isEnabled || !measurementId || !GOOGLE_ANALYTICS_ID_PATTERN.test(measurementId)) {
    return undefined;
  }

  return measurementId;
};

export const trackEvent = <EventName extends AnalyticsEventName>(
  eventName: EventName,
  parameters: AnalyticsEventMap[EventName],
): void => {
  if (globalThis.window === undefined || !getGoogleAnalyticsId()) {
    return;
  }

  const googleAnalyticsWindow = globalThis as unknown as GoogleAnalyticsWindow;

  googleAnalyticsWindow.gtag?.("event", eventName, parameters);
};
