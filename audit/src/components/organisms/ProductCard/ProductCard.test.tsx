import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductCard } from "@/components/organisms/ProductCard/ProductCard";

describe("ProductCard", () => {
  it("renders featured product details", () => {
    render(<ProductCard name="Starter Hoodie" price={59} />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter Hoodie" })).toBeInTheDocument();
    expect(screen.getByText("$59.00")).toBeInTheDocument();
  });
});
