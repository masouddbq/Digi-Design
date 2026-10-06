import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "ورود | ثبت‌نام",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-10">
      <LoginForm />
    </div>
  );
}
