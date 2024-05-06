import { SignUpForm } from "@/components/forms/signup";

export default function SignUpPage(): JSX.Element {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignUpForm />
    </main>
  );
}
