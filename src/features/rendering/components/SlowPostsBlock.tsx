import { fetchExamplePosts } from "@/services/rendering/fetch-examples-posts";
import { delay } from "@/utils/rendering/delay";
import { PostPreviewList } from "@/features/rendering/components/PostPreviewList";

export const SlowPostsBlock = async () => {
  await delay(1500);
  const payload = await fetchExamplePosts("streaming");

  return (
    <div>
      <p>
        <strong>Streamed block fetched at:</strong> {payload.fetchedAt}
      </p>
      <PostPreviewList posts={payload.posts} />
    </div>
  );
};
