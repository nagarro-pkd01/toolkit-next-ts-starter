import { ENV } from "@/constants/config";
import type { Post } from "@/types/postTypes";
import type { ExamplePostsPayload, RenderingStrategyId } from "@/types/renderingTypes";

const DEFAULT_LIMIT = 3;

const buildPostsUrl = (limit: number): string => {
  return `${ENV.placeholderApiUrl}/posts?_limit=${limit}`;
};

const parsePosts = async (response: Response, limit: number): Promise<Post[]> => {
  if (!response.ok) {
    throw new Error(`Failed to load posts (${response.status})`);
  }

  const posts = (await response.json()) as Post[];
  return posts.slice(0, limit);
};

export const fetchExamplePosts = async (
  strategy: RenderingStrategyId,
  limit = DEFAULT_LIMIT,
): Promise<ExamplePostsPayload> => {
  const fetchedAt = new Date().toISOString();
  const url = buildPostsUrl(limit);

  if (strategy === "static") {
    const response = await fetch(url, { cache: "force-cache" });
    const posts = await parsePosts(response, limit);
    return { fetchedAt, posts, strategy };
  }

  if (strategy === "dynamic" || strategy === "streaming" || strategy === "client") {
    const response = await fetch(url, { cache: "no-store" });
    const posts = await parsePosts(response, limit);
    return { fetchedAt, posts, strategy };
  }

  // ISR — segment revalidate + fetch revalidate must align on the route
  const response = await fetch(url, { next: { revalidate: 60 } });
  const posts = await parsePosts(response, limit);
  return { fetchedAt, posts, strategy };
};
