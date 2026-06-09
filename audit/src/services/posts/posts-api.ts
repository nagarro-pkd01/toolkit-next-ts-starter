import { placeholderClient } from "@/services/api-clients/placeholder-client";
import type { Post } from "@/types/post-types";

export const fetchPosts = async (): Promise<Post[]> => {
  return placeholderClient.get<Post[]>("/posts");
};
