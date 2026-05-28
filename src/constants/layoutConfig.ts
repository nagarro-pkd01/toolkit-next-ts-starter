import type { Route } from "next";

import { APP_ROUTES } from "@/constants/app";

export type LayoutShellId = "auth" | "dashboard" | "shop";

export type NavLink = {
  href: Route;
  label: string;
};

export type HeaderConfig = {
  brandHref: Route;
  brandLabel: string;
  links: NavLink[];
  showSearch: boolean;
};

export type FooterConfig = {
  copyright: string;
};

export type LayoutShellOptions = {
  showFooter: boolean;
  showHeader: boolean;
};

export const HEADER_CONFIG: HeaderConfig = {
  brandHref: APP_ROUTES.home,
  brandLabel: "Toolkit Commerce",
  links: [
    { href: APP_ROUTES.home, label: "Shop" },
    { href: APP_ROUTES.dashboard, label: "Dashboard" },
    { href: APP_ROUTES.rendering, label: "Rendering" },
    { href: APP_ROUTES.signIn, label: "Sign in" },
  ],
  showSearch: true,
};

export const FOOTER_CONFIG: FooterConfig = {
  copyright: "2026 Toolkit Commerce. All rights reserved.",
};

/** Per-layout header/footer visibility. */
export const LAYOUT_SHELL_CONFIG: Record<LayoutShellId, LayoutShellOptions> = {
  auth: {
    showFooter: false,
    showHeader: false,
  },
  dashboard: {
    showFooter: false,
    showHeader: true,
  },
  shop: {
    showFooter: true,
    showHeader: true,
  },
};

/** Optional overrides when using `?client=` (see README multi-client demo). */
export const CLIENT_LAYOUT_SHELL_OVERRIDES: Record<
  string,
  Partial<Record<LayoutShellId, Partial<LayoutShellOptions>>>
> = {
  acme: {
    shop: { showFooter: false },
  },
  globex: {
    dashboard: { showFooter: true },
  },
};

export const resolveLayoutShellOptions = (
  layoutId: LayoutShellId,
  clientKey?: string,
): LayoutShellOptions => {
  const base = LAYOUT_SHELL_CONFIG[layoutId];
  const override = clientKey ? CLIENT_LAYOUT_SHELL_OVERRIDES[clientKey]?.[layoutId] : undefined;

  return {
    showFooter: override?.showFooter ?? base.showFooter,
    showHeader: override?.showHeader ?? base.showHeader,
  };
};
