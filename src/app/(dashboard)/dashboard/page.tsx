export const dynamic = "force-dynamic";

import { getClientKey } from "@/utils/layout/getClientKey";
import DashboardPage from "@/views/dashboard/DashboardPage";

type DashboardRouteProps = {
  searchParams: Promise<{ client?: string | string[] }>;
};

export default async function Page({ searchParams }: DashboardRouteProps) {
  const clientKey = getClientKey(await searchParams);

  return <DashboardPage clientKey={clientKey} />;
}
