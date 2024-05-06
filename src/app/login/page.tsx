"use client";
import { LoginForm } from "@/components/forms/login";

export default function LoginPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}
