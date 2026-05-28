import { render, screen } from "@testing-library/react";

import { LoginPanel } from "@/views/sign-in/LoginPanel";

describe("LoginPanel", () => {
  it("renders email and password fields", () => {
    render(<LoginPanel />);

    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("••••••••")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Sign in" })).toBeInTheDocument();
  });
});
