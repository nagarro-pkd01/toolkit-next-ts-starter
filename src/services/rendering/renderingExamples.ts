import { APP_ROUTES } from "@/constants/routeConstants";
import type { RenderingExampleLink } from "@/types/renderingTypes";

export const RENDERING_EXAMPLES: RenderingExampleLink[] = [
  {
    description: "Prerendered at build; same HTML for every user.",
    href: APP_ROUTES.renderingStatic,
    strategy: "static",
    title: "Static (SSG)",
  },
  {
    description: "Rendered on the server for each request.",
    href: APP_ROUTES.renderingDynamic,
    strategy: "dynamic",
    title: "Dynamic (SSR)",
  },
  {
    description: "Cached static page revalidated every 60 seconds.",
    href: APP_ROUTES.renderingIsr,
    strategy: "isr",
    title: "ISR",
  },
  {
    description: "Shell streams first; slow section loads inside Suspense.",
    href: APP_ROUTES.renderingStreaming,
    strategy: "streaming",
    title: "Streaming",
  },
  {
    description: "Data fetched in the browser after hydration.",
    href: APP_ROUTES.renderingClient,
    strategy: "client",
    title: "Client (CSR)",
  },
];
