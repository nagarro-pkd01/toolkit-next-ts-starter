import { CartSummary } from "@/components/organisms/cart-summary/cart-summary";
import { ProductCard } from "@/components/organisms/product-card/product-card";
import { ProductPageTemplate } from "@/components/templates/product-page/product-page";
import { withErrorBoundary } from "@/lib/errors/boundary";
import { internalClient } from "@/services/api-clients/internal.client";

export const dynamic = "force-dynamic";

type HealthResponse = {
  service: string;
  status: string;
  timestamp: string;
};

const getHealth = async () => {
  return withErrorBoundary(() => internalClient.get<HealthResponse>("/api/health"), {
    layer: "app/(shop)/page",
    operation: "getHealth",
  });
};

export default async function ShopPage() {
  const health = await getHealth();

  return (
    <ProductPageTemplate>
      <h1>Shop Home</h1>
      <p>
        Internal health: {health.status} ({health.service})
      </p>
      <div style={{ display: "grid", gap: 12 }}>
        <ProductCard name="Starter Product" price={149} />
        <CartSummary total={149} />
      </div>
    </ProductPageTemplate>
  );
}
