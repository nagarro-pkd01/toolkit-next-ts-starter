import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "@/components/atoms/Button/Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Sign in</Button>);

    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Submit</Button>);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
