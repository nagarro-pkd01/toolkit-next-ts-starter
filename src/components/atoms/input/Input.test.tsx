import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Input } from "@/components/atoms/Input/Input";

describe("Input", () => {
  it("passes native input props through", () => {
    render(<Input aria-label="Email" placeholder="john@example.com" type="email" />);

    const input = screen.getByLabelText("Email");

    expect(input).toHaveAttribute("placeholder", "john@example.com");
    expect(input).toHaveAttribute("type", "email");
  });
});
