"use client";
import { ChatSelection } from "@/components/chat/Selection";
import { ROUTES } from "@/routes";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    return useRouter().push(ROUTES.LOGIN);
  }

  return (
    <main className="flex min-h-full flex-col items-center justify-between p-24">
      <ChatSelection />
    </main>
  );
}
