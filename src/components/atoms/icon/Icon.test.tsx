import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "@/components/atoms/icon/Icon";

describe("Icon", () => {
  it("renders the uppercase initial from the label", () => {
    render(<Icon label="search" />);

    expect(screen.getByText("S")).toBeInTheDocument();
  });
});
