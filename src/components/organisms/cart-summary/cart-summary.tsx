import { PriceDisplay } from "@/components/molecules/price-display/price-display";
import styles from "./cart-summary.module.scss";

type CartSummaryProps = {
  total: number;
};

export const CartSummary = ({ total }: CartSummaryProps) => {
  return (
    <aside className={styles.summary}>
      <strong>Cart Total</strong>
      <PriceDisplay amount={total} />
    </aside>
  );
};
