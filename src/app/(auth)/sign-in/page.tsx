import { AuthLayout } from "@/components/templates/auth-layout/auth-layout";
import { LoginPanel } from "@/modules/auth";

export default function SignInPage() {
  return (
    <AuthLayout>
      <h1>Sign In</h1>
      <LoginPanel />
    </AuthLayout>
  );
}
