import type { InputHTMLAttributes } from "react";

import styles from "./input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...rest }: InputProps) => {
  return <input className={`${styles.input} ${className}`.trim()} {...rest} />;
};
