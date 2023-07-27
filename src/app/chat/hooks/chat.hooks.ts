import { useContext, useEffect, useRef, useState } from "react";
import { HumanMessage, AIMessage, Message } from "../schemas/chat.schemas";
import { Socket, io } from "socket.io-client";
import socketIOClient from "socket.io-client";
import { SocketContext } from "@/providers/socket.provider";
import { config } from "@/config";

export const useChat = () => {
  //const socket = io("http://localhost:4000")
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    // Listens for incoming messages
    socket.on("data", (chunk: string) => {
      if (chunk === "[DONE]") {
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

    socket.on("source", (response: any) => {
      const { text, sourceDocuments } = response;
      setMessages((prev) => {
        const newAIMessage = new AIMessage(text);
        newAIMessage.setSourceDocuments(sourceDocuments);
        console.log(newAIMessage);
        const newMessages = [...prev];
        newMessages.pop();
        newMessages.push(newAIMessage);
        return newMessages;
      });
    });
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = new HumanMessage(input);

    setMessages((prev) => [...prev, userMessage]);
    setMessages((prev) => [...prev, new AIMessage("")]);
    setInput("");

    socket.emit("chat", userMessage.content);
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  };
};
