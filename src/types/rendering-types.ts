import type { Route } from "next";

import type { Post } from "@/types/post-types";

export type RenderingStrategyId = "client" | "dynamic" | "isr" | "static" | "streaming";

export type ExamplePostsPayload = {
  fetchedAt: string;
  posts: Post[];
  strategy: RenderingStrategyId;
};

export type RenderingExampleLink = {
  description: string;
  href: Route;
  strategy: RenderingStrategyId;
  title: string;
};
