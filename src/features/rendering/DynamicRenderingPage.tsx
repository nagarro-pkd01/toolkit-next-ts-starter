import Link from "next/link";

import { ProductPageTemplate } from "@/components/templates/ProductPageLayout/ProductPageTemplate";
import { APP_ROUTES } from "@/constants/routeConstants";
import { fetchExamplePosts } from "@/services/rendering/fetch-examples-posts";
import { PostPreviewList } from "@/features/rendering/components/PostPreviewList";
import { RenderingMeta } from "@/features/rendering/components/RenderingMeta";

import styles from "./RenderingExamplePage.module.scss";

export default async function DynamicRenderingPage() {
  const payload = await fetchExamplePosts("dynamic");

  return (
    <ProductPageTemplate>
      <div className={styles.page}>
        <RenderingMeta
          configHint="export const dynamic = 'force-dynamic' and fetch({ cache: 'no-store' })"
          description="Rendered on the server for every request. Refresh the page — the timestamp should change."
          fetchedAt={payload.fetchedAt}
          strategy="dynamic"
          title="Dynamic server rendering (SSR)"
        />
        <PostPreviewList posts={payload.posts} />
        <Link href={APP_ROUTES.rendering}>← All rendering examples</Link>
      </div>
    </ProductPageTemplate>
  );
}
