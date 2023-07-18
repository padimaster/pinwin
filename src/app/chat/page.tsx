import Chat from "@/components/chat/components/chat.component";

export default function ChatPage() {
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
      <Chat />
    </main>
  );
}
