import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SearchBar } from "@/components/molecules/search-bar/SearchBar";

describe("SearchBar", () => {
  it("renders the default search input", () => {
    render(<SearchBar />);

    expect(screen.getByPlaceholderText("Search products")).toBeInTheDocument();
  });

  it("renders a custom placeholder", () => {
    render(<SearchBar placeholder="Search posts" />);

    expect(screen.getByPlaceholderText("Search posts")).toBeInTheDocument();
  });
});
