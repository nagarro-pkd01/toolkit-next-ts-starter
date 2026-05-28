import styles from "./price-display.module.scss";

type PriceDisplayProps = {
  amount: number;
  currency?: string;
};

export const PriceDisplay = ({ amount, currency = "USD" }: PriceDisplayProps) => {
  return (
    <span className={styles.price}>
      {new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount)}
    </span>
  );
};
