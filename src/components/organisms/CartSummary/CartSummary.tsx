import { PriceDisplay } from "@/components/molecules/PriceDisplay/PriceDisplay";
import styles from "./CartSummary.module.scss";

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
