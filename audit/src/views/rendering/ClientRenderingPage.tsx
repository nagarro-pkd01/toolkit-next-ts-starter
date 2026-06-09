import Link from "next/link";

import { ProductPageTemplate } from "@/components/templates/ProductPage/ProductPageTemplate";
import { APP_ROUTES } from "@/constants/routeConstants";
import { ClientPostsPanel } from "@/views/rendering/components/ClientPostsPanel";
import { RenderingMeta } from "@/views/rendering/components/RenderingMeta";

import styles from "./RenderingExamplePage.module.scss";

export default function ClientRenderingPage() {
  return (
    <ProductPageTemplate>
      <div className={styles.page}>
        <RenderingMeta
          configHint='"use client" + useEffect fetch to /api/rendering/sample-posts'
          description="The server sends a minimal shell; posts load in the browser after hydration."
          strategy="client"
          title="Client-side rendering (CSR)"
        />
        <ClientPostsPanel />
        <Link href={APP_ROUTES.rendering}>← All rendering examples</Link>
      </div>
    </ProductPageTemplate>
  );
}
