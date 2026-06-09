import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FormField } from "@/components/molecules/FormField/FormField";

describe("FormField", () => {
  it("renders the label and child control", () => {
    render(
      <FormField label="Email">
        <input aria-label="Email address" />
      </FormField>,
    );

    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email address")).toBeInTheDocument();
  });
});
