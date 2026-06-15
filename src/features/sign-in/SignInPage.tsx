import { AuthLayout } from "@/components/templates/AuthLayout/AuthLayout";
import { LoginPanel } from "@/features/sign-in/LoginPanel";

type SignInPageProps = {
  clientKey?: string;
};

export default function SignInPage({ clientKey }: SignInPageProps) {
  return (
    <AuthLayout clientKey={clientKey}>
      <h1>Sign In</h1>
      <LoginPanel />
    </AuthLayout>
  );
}
