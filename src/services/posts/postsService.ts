import { fetchPosts } from "@/services/posts/postsApi";
import type { Post } from "@/types/postTypes";

const DEFAULT_LIMIT = 10;

export const postsService = {
  async getPosts(limit = DEFAULT_LIMIT): Promise<Post[]> {
    const posts = await fetchPosts();
    return posts.slice(0, limit);
  },
};
