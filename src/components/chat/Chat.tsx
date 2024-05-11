"use client";

import { Button, Card, ScrollShadow, Spacer, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { ChatMessage } from "./Message";

export const Chat = () => {
  const [chatFeed, setChatFeed] = useState<UserMessage[]>([
    {
      id: "321321",
      username: "sinanovicanes",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM9oqFgaB094M37R1FypqK9dT_8m1nIjY5g&s",
      message: "Hi",
      date: Date.now()
    }
  ]);

  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");

  function sendMessage() {
    if (!message) return;
    if (sending) return;

    setSending(true);

    setChatFeed([
      ...chatFeed,
      {
        id: "3213211",
        username: "sinanovicanes",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM9oqFgaB094M37R1FypqK9dT_8m1nIjY5g&s",
        message,
        date: Date.now()
      }
    ]);

    setMessage("");
    setSending(false);
  }

  return (
    <main className="w-full h-full flex items-center justify-center">
      <section className="w-1/2 h-5/6 flex items-center justify-center flex-col gap-2">
        <Card className="w-full h-5/6 space-y-5 p-4" radius="lg">
          <ScrollShadow hideScrollBar className="w-full h-full">
            {chatFeed.map(m => (
              <>
                <div key={m.id}>
                  <ChatMessage key={m.id} message={m} />
                  <Spacer key={m.id} />
                </div>
              </>
            ))}
          </ScrollShadow>
        </Card>
        <Textarea
          placeholder="Type your message"
          minRows={1}
          value={message}
          onValueChange={setMessage}
          className="w-full h-1/6"
          endContent={
            <Button isLoading={sending} isDisabled={!message} onClick={sendMessage}>
              Send
            </Button>
          }
        />
      </section>
    </main>
  );
};
