import { PriceDisplay } from "@/components/molecules/price-display/PriceDisplay";
import styles from "./CartSummary.module.scss";

type CartSummaryProps = {
  total: number;
};

export const CartSummary = ({ total }: CartSummaryProps) => (
  <aside className={styles.summary}>
    <strong>Cart Total</strong>
    <PriceDisplay amount={total} />
  </aside>
);
