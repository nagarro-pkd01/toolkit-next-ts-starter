import type { ReactNode } from "react";

import styles from "./FormField.module.scss";

type FormFieldProps = {
  label: string;
  children: ReactNode;
};

export const FormField = ({ label, children }: FormFieldProps) => {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
};
