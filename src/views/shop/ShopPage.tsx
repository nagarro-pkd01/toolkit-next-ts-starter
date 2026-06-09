import { CartSummary } from "@/components/organisms/CartSummary/CartSummary";
import { ProductCard } from "@/components/organisms/ProductCard/ProductCard";
import { ProductPageTemplate } from "@/components/templates/ProductPage/ProductPageTemplate";
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
