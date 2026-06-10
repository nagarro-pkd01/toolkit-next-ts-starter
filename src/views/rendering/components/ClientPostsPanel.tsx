"use client";

import { useEffect, useState } from "react";

import type { ExamplePostsPayload } from "@/types/rendering-types";
import { PostPreviewList } from "@/views/rendering/components/PostPreviewList";
import { PostsSkeleton } from "@/views/rendering/components/PostsSkeleton";

export const ClientPostsPanel = () => {
  const [payload, setPayload] = useState<ExamplePostsPayload | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await fetch("/api/rendering/sample-posts");

        if (!response.ok) {
          throw new Error(`Request failed (${response.status})`);
        }

        const data = (await response.json()) as ExamplePostsPayload;
        setPayload(data);
      } catch (loadError) {
        const message = loadError instanceof Error ? loadError.message : "Unknown error";
        setError(message);
      }
    };

    void loadPosts();
  }, []);

  if (error) {
    return <p role="alert">{error}</p>;
  }

  if (!payload) {
    return <PostsSkeleton />;
  }

  return (
    <div>
      <p>
        <strong>Client fetch at:</strong> {payload.fetchedAt}
      </p>
      <PostPreviewList posts={payload.posts} />
    </div>
  );
};
