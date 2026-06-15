import Link from "next/link";

import { ProductPageTemplate } from "@/components/templates/ProductPageLayout/ProductPageTemplate";
import { APP_ROUTES } from "@/constants/routeConstants";
import { fetchExamplePosts } from "@/services/rendering/fetch-examples-posts";
import { PostPreviewList } from "@/features/rendering/components/PostPreviewList";
import { RenderingMeta } from "@/features/rendering/components/RenderingMeta";

import styles from "./RenderingExamplePage.module.scss";

export default async function StaticRenderingPage() {
  const payload = await fetchExamplePosts("static");

  return (
    <ProductPageTemplate>
      <div className={styles.page}>
        <RenderingMeta
          configHint="export const dynamic = 'force-static' and fetch({ cache: 'force-cache' })"
          description="HTML is prerendered. The sample timestamp is fixed until the next production build (or revalidation)."
          fetchedAt={payload.fetchedAt}
          strategy="static"
          title="Static generation (SSG)"
        />
        <PostPreviewList posts={payload.posts} />
        <Link href={APP_ROUTES.rendering}>← All rendering examples</Link>
      </div>
    </ProductPageTemplate>
  );
}
