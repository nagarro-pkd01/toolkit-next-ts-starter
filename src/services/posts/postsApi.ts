import { placeholderClient } from "@/services/api-clients/placeholderClient";
import type { Post } from "@/types/postTypes";

export const fetchPosts = async (): Promise<Post[]> => {
  return placeholderClient.get<Post[]>("/posts");
};
