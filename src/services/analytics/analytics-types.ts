import type { ThemePreference } from "@/constants/themeConstants";

type AnalyticsParameter = boolean | number | string;

export type AnalyticsEventMap = {
  theme_changed: {
    source: "preference-selector" | "quick-toggle";
    theme: ThemePreference;
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEventParameters = Record<string, AnalyticsParameter>;
