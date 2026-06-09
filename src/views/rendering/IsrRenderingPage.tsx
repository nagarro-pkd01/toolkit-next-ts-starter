import Link from "next/link";

import { ProductPageTemplate } from "@/components/templates/ProductPage/ProductPageTemplate";
import { APP_ROUTES } from "@/constants/routeConstants";
import { fetchExamplePosts } from "@/services/rendering/fetch-examples-posts";
import { PostPreviewList } from "@/views/rendering/components/PostPreviewList";
import { RenderingMeta } from "@/views/rendering/components/RenderingMeta";

import styles from "./RenderingExamplePage.module.scss";

export default async function IsrRenderingPage() {
  const payload = await fetchExamplePosts("isr");

  return (
    <ProductPageTemplate>
      <div className={styles.page}>
        <RenderingMeta
          configHint="export const revalidate = 60 and fetch({ next: { revalidate: 60 } })"
          description="Serves a cached page, then regenerates in the background at most once per 60 seconds."
          fetchedAt={payload.fetchedAt}
          strategy="isr"
          title="Incremental Static Regeneration (ISR)"
        />
        <PostPreviewList posts={payload.posts} />
        <Link href={APP_ROUTES.rendering}>← All rendering examples</Link>
      </div>
    </ProductPageTemplate>
  );
}
