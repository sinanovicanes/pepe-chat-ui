import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io("http://localhost:3000", {
  autoConnect: false
});

export const WebsocketContext = createContext(socket);
export const WebsocketContextProvider = WebsocketContext.Provider;
