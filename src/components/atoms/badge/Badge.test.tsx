import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/atoms/Badge/Badge";

describe("Badge", () => {
  it("renders the provided label", () => {
    render(<Badge label="Featured" />);

    expect(screen.getByText("Featured")).toBeInTheDocument();
  });
});
