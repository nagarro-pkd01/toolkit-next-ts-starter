import { CartSummary } from "@/components/shop/cart-summary/CartSummary";
import { ProductCard } from "@/components/shop/product-card/ProductCard";
import { ProductPageTemplate } from "@/components/templates/product-page/ProductPageTemplate";
import { internalClient } from "@/services/api-clients/internal-client";
import { withErrorBoundary } from "@/utils/errors/error-boundary";

import styles from "./ShopPage.module.scss";

type HealthResponse = {
  service: string;
  status: string;
  timestamp: string;
};

const getHealth = async () => {
  return withErrorBoundary(() => internalClient.get<HealthResponse>("/api/health"), {
    layer: "views/shop/ShopPage",
    operation: "getHealth",
  });
};

type ShopPageProps = {
  clientKey?: string;
};

export default async function ShopPage({ clientKey }: ShopPageProps) {
  const health = await getHealth();

  return (
    <ProductPageTemplate clientKey={clientKey}>
      <h1>Shop Home</h1>
      <p>
        Internal health: {health.status} ({health.service})
      </p>
      <div className={styles.productList}>
        <ProductCard name="Starter Product" price={149} />
        <CartSummary total={149} />
      </div>
    </ProductPageTemplate>
  );
}
