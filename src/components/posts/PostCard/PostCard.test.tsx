import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostCard } from "@/components/Posts/PostCard/PostCard";

describe("PostCard", () => {
  it("renders post metadata and content", () => {
    render(
      <PostCard
        post={{
          body: "A compact article preview.",
          id: 7,
          title: "Rendering notes",
          userId: 1,
        }}
      />,
    );

    expect(screen.getByText("Post #7")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Rendering notes" })).toBeInTheDocument();
    expect(screen.getByText("A compact article preview.")).toBeInTheDocument();
  });
});
