"use client";
import { WebsocketContextProvider, socket } from "@/contexts/socket";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WebsocketContextProvider value={socket}>
        <NextUIProvider>
          <NextThemesProvider>{children}</NextThemesProvider>
        </NextUIProvider>
      </WebsocketContextProvider>
    </SessionProvider>
  );
}
