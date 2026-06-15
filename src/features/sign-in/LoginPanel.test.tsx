import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LoginPanel } from "@/features/sign-in/LoginPanel";

describe("LoginPanel", () => {
  it("renders email and password fields", () => {
    render(<LoginPanel />);

    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });
});
