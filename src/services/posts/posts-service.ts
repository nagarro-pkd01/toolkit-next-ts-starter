import { fetchPosts } from "@/services/posts/posts-api";
import type { Post } from "@/types/post-types";

const DEFAULT_LIMIT = 10;

export const postsService = {
  async getPosts(limit = DEFAULT_LIMIT): Promise<Post[]> {
    const posts = await fetchPosts();
    return posts.slice(0, limit);
  },
};
