import { useState } from "react";
import { HumanMessage, AIMessage, Message } from "../schemas/chat.schemas";
import io, { Socket } from "Socket.IO-client";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const socket: Socket = io("http://localhost:4000");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = new HumanMessage(input);

    setMessages((prev) => ([...prev, userMessage]));
    setMessages((prev) => ([...prev, new AIMessage('')]));
  
    socket.emit("chat", userMessage.content);

    socket.on("data", (chunk: string) => {
      if(chunk === "[DONE]") {
        return;
      }

      setMessages((prev) => {
        const prevMessage = prev[prev.length - 1];
        const newAIMessage = new AIMessage(prevMessage.content + chunk);
        const newMessages = [...prev];
        newMessages.pop();
        newMessages.push(newAIMessage);
        return newMessages;
      });
    });

    socket.on("source", (sourceDocuments) => {
      setMessages((prev) => {
        const prevMessage = prev[prev.length - 1];
        const newAIMessage = new AIMessage(prevMessage.content);
        const sources = sourceDocuments.map((sourceDocument: any) => {
          const currentSource = sourceDocument.metadata.source;
          const url = currentSource.substring(currentSource.indexOf("public/") + "public/".length);
          sourceDocument.metadata.source = `http://localhost:4000/${url}`;
          return sourceDocument;
        });
  
        newAIMessage.source = sources;
        const newMessages = [...prev];
        newMessages.pop();
        newMessages.push(newAIMessage);
        return newMessages;
      });
    });
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  };
};
