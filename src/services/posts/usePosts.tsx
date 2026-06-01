"use client";

import { useQuery } from "@tanstack/react-query";
import { postsService } from "@/services/posts/postsService";
import type { Post } from "@/types/postTypes";

export const usePosts = (limit = 10) => {
  return useQuery<Post[], Error>({
    queryKey: ["posts", limit],
    queryFn: () => postsService.getPosts(limit),
  });
};
