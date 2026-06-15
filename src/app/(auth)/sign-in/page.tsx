import { getClientKey } from "@/utils/layout/get-client-key";
import SignInPage from "@/features/sign-in/SignInPage";

type SignInRouteProps = {
  searchParams: Promise<{ client?: string | string[] }>;
};

export default async function Page({ searchParams }: SignInRouteProps) {
  const clientKey = getClientKey(await searchParams);

  return <SignInPage clientKey={clientKey} />;
}
