import Link from "next/link";
import { Suspense } from "react";

import { ProductPageTemplate } from "@/components/templates/ProductPage/ProductPageTemplate";
import { APP_ROUTES } from "@/constants/routeConstants";
import { PostsSkeleton } from "@/views/rendering/components/PostsSkeleton";
import { RenderingMeta } from "@/views/rendering/components/RenderingMeta";
import { SlowPostsBlock } from "@/views/rendering/components/SlowPostsBlock";

import styles from "./RenderingExamplePage.module.scss";

export default function StreamingRenderingPage() {
  return (
    <ProductPageTemplate>
      <div className={styles.page}>
        <RenderingMeta
          configHint="<Suspense> + async Server Component (1.5s delay) + streaming/loading.tsx"
          description="The shell renders immediately. The posts block streams in after the artificial delay."
          strategy="streaming"
          title="Streaming with Suspense"
        />
        <Suspense fallback={<PostsSkeleton />}>
          <SlowPostsBlock />
        </Suspense>
        <Link href={APP_ROUTES.rendering}>← All rendering examples</Link>
      </div>
    </ProductPageTemplate>
  );
}
