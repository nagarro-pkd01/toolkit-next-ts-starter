export const dynamic = "force-dynamic";

import { getClientKey } from "@/utils/layout/get-client-key";
import ShopPage from "@/views/shop/ShopPage";

type ShopRouteProps = {
  searchParams: Promise<{ client?: string | string[] }>;
};

export default async function Page({ searchParams }: ShopRouteProps) {
  const clientKey = getClientKey(await searchParams);

  return <ShopPage clientKey={clientKey} />;
}
