export const dynamic = "force-dynamic";

import { getClientKey } from "@/utils/layout/get-client-key";
import DashboardPage from "@/features/dashboard/DashboardPage";

type DashboardRouteProps = {
  searchParams: Promise<{ client?: string | string[] }>;
};

export default async function Page({ searchParams }: DashboardRouteProps) {
  const clientKey = getClientKey(await searchParams);

  return <DashboardPage clientKey={clientKey} />;
}
