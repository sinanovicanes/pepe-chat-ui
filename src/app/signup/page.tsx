import { SignUpForm } from "@/components/forms/signup";

export default function SignUpPage(): JSX.Element {
  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <SignUpForm />
    </main>
  );
}
