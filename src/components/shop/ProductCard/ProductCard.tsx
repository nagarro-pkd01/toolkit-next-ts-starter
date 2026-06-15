import { Badge } from "@/components/atoms/Badge/Badge";
import { PriceDisplay } from "@/components/molecules/PriceDisplay/PriceDisplay";

import styles from "./ProductCard.module.scss";

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
