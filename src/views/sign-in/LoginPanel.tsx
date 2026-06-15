import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { FormField } from "@/components/molecules/form-field/FormField";

import styles from "./LoginPanel.module.scss";

export const LoginPanel = () => {
  return (
    <form className={styles.form}>
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
