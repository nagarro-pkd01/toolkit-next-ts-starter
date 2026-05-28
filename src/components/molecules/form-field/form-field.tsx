import type { ReactNode } from "react";

import styles from "./form-field.module.scss";

type FormFieldProps = {
  label: string;
  children: ReactNode;
};

export const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
    </div>
  );
};
