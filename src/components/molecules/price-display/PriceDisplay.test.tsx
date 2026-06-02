import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PriceDisplay } from "@/components/molecules/price-display/PriceDisplay";

describe("PriceDisplay", () => {
  it("formats USD by default", () => {
    render(<PriceDisplay amount={1299.5} />);

    expect(screen.getByText("$1,299.50")).toBeInTheDocument();
  });

  it("formats the provided currency", () => {
    render(<PriceDisplay amount={42} currency="EUR" />);

    expect(screen.getByText("€42.00")).toBeInTheDocument();
  });
});
