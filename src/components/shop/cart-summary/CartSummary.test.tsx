import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CartSummary } from "@/components/shop/cart-summary/CartSummary";

describe("CartSummary", () => {
  it("renders the cart total", () => {
    render(<CartSummary total={84.75} />);

    expect(screen.getByText("Cart Total")).toBeInTheDocument();
    expect(screen.getByText("$84.75")).toBeInTheDocument();
  });
});
