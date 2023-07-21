"use client"

import Chat from "@/components/chat/chat.component";
import { Socket, io } from "socket.io-client";

export default function ChatPage() {
  const socket: Socket = io("http://localhost:4000");

  return (
    <main
      className='flex flex-col items-center min-h-screen'
      style={{
        backgroundImage: `linear-gradient(rgba(36, 17, 50, 0.7), rgba(36, 17, 50, 0.7)), url('./logo.svg')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Chat socket={socket}/>
    </main>
  );
}
