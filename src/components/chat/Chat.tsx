"use client";

import { SocketConnectionState } from "@/enums/socket";
import { Button, Card, Chip, ScrollShadow, Spacer, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { ChatMessage } from "./Message";
import { sendMessage as sendMessageToServer } from "@/utils/api/sendMessage";

export const Chat = () => {
  const params = useParams();
  const { data: session, status } = useSession();
  const [socket, setSocket] = useState<Socket | undefined>();
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [connectionState, setConnectionState] = useState(
    SocketConnectionState.DISCONNECTED
  );
  const [chatFeed, setChatFeed] = useState<UserMessage[]>([
    {
      _id: "321321",
      user: {
        _id: "321",
        username: "sinanovicanes",
        avatar:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM9oqFgaB094M37R1FypqK9dT_8m1nIjY5g&s"
      },
      message: "Hi",
      date: Date.now()
    }
  ]);

  useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      socket.emit("joinRoom", params.id);
      setConnectionState(SocketConnectionState.CONNECTED);
    });

    socket.on("disconnect", () => {
      setConnectionState(SocketConnectionState.DISCONNECTED);
    });

    socket.io.on("reconnect_attempt", () => {
      setConnectionState(SocketConnectionState.RECONNECTING);
    });

    socket.on("newMessage", (message: UserMessage) => {
      setChatFeed(_chatFeed => [..._chatFeed, message]);
    });
  }, [socket]);

  const connectToSocket = async () => {
    const accessToken = session?.user.accessToken;

    if (!accessToken || !!socket) return;

    setSocket(
      io("http://localhost:3000", {
        extraHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      })
    );
  };

  const disconnectFromSocket = async () => {
    if (!socket) return;

    socket.disconnect();
    setSocket(undefined);
  };

  useEffect(() => {
    connectToSocket();
    return () => {
      disconnectFromSocket();
    };
  }, [session, status]);

  async function sendMessage() {
    if (!socket) return;
    if (!message) return;
    if (sending) return;
    setSending(true);
    await sendMessageToServer(params.id as string, message, session?.user.accessToken);
    setMessage("");
    setSending(false);
  }

  const ConnectionStatus = ({ ...props }) => {
    switch (connectionState) {
      case SocketConnectionState.CONNECTED:
        return (
          <Chip {...props} color="success">
            Online
          </Chip>
        );

      case SocketConnectionState.RECONNECTING:
        return (
          <Chip {...props} color="warning">
            Reconnecting
          </Chip>
        );

      default:
        return (
          <Chip {...props} color="danger">
            Offline
          </Chip>
        );
    }
  };

  return (
    <main className="w-full h-full flex items-center justify-center">
      <section className="w-1/2 h-5/6 flex items-center justify-center flex-col gap-2">
        <ConnectionStatus className="mr-auto" />
        <Card className="w-full h-[500px] space-y-5 p-4" radius="lg">
          <ScrollShadow hideScrollBar className="w-full h-full">
            {chatFeed.map(m => (
              <div key={m._id}>
                <ChatMessage
                  className={`${session?.user.id === m.user._id && "ml-auto"}`}
                  message={m}
                />
                <Spacer />
              </div>
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
            <Button
              isLoading={sending}
              isDisabled={!message || connectionState != SocketConnectionState.CONNECTED}
              onClick={sendMessage}
            >
              Send
            </Button>
          }
        />
      </section>
    </main>
  );
};
