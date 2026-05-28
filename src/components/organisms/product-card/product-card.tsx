import { PriceDisplay } from "@/components/molecules/price-display/price-display";
import { Badge } from "@/components/ui";
import styles from "./product-card.module.scss";

type ProductCardProps = {
  name: string;
  price: number;
};

export const ProductCard = ({ name, price }: ProductCardProps) => {
  return (
    <article className={styles.card}>
      <Badge label="Featured" />
      <h3>{name}</h3>
      <PriceDisplay amount={price} />
    </article>
  );
};
