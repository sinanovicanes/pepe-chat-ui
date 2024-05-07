"use client";
import { LoginForm } from "@/components/forms/login";

export default function LoginPage(): JSX.Element {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <LoginForm />
    </main>
  );
}
