import { Chat } from "@/components/Chat/Chat";

export default function ChatPage(): JSX.Element {
  return (
    <main className="flex flex-col items-center justify-between h-full p-24">
      <Chat />
    </main>
  );
}
