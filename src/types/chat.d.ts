interface ChatRoom {
  id: string;
  name: string;
}

interface ExtendedChatRoom extends ChatRoom {
  activeChatters: number;
  maxChatters: number;
  protected: boolean;
  owner: string;
}

interface ChatSelectionColumn {
  id: string;
  label: string;
  key: string;
  align?: "center" | "end" | "start";
}
