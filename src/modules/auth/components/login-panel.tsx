import { FormField } from "@/components/molecules/form-field/form-field";
import { Button, Input } from "@/components/ui";

export const LoginPanel = () => {
  return (
    <form style={{ display: "grid", gap: 12 }}>
      <FormField label="Email">
        <Input placeholder="john@example.com" type="email" />
      </FormField>
      <FormField label="Password">
        <Input placeholder="••••••••" type="password" />
      </FormField>
      <Button type="submit">Sign in</Button>
    </form>
  );
};
