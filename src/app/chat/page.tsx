"use client";

import SocketProvider from "@/providers/socket.provider";
import { Socket, io } from "socket.io-client";
import Chat from "./ components/chat.component";
import { IMAGES } from "@/lib/images.lib";
import CapybaraAvatar from "./ components/chat-capybara.component";

export default function ChatPage() {
  return (
    <SocketProvider>
      <main
        className='min-w-screen min-h-screen flex justify-evenly items-center'
        style={{
          backgroundImage: `url(${IMAGES.CHAT.BACKGROUND})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          objectFit: "contain",
        }}
      >
        <CapybaraAvatar />
        <Chat />
      </main>
    </SocketProvider>
  );
}
