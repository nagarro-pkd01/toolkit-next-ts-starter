import type { ButtonHTMLAttributes, ReactNode } from "react";

import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export const Button = ({ children, className = "", type = "button", ...rest }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${className}`.trim()} type={type} {...rest}>
      {children}
    </button>
  );
};
