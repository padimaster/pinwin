import { useState } from "react";
import { Message } from "../lib/chat.lib";
import { fetchChatAPI } from "../services/chat.services";
import { HumanMessage, AIMessage } from "../schemas/chat.schemas";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [aiMessage, setAIMessage] = useState<AIMessage>(new AIMessage(""));
  const [input, setInput] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userMessage = new HumanMessage(input);

    setMessages(prev => [...prev, userMessage]);
    
    const source = fetchChatAPI(messages);

    setMessages(prev => [...prev, aiMessage]);

    source.onmessage = ({ data }) => {
      if (data === '[DONE]') {
          source.close()
          return
      }
      
      const parsedData = JSON.parse(data)

      console.log("parsedData", parsedData);

      const chunk = parsedData.content
      
      console.log("chunk", chunk);
      
      setAIMessage(prev => new AIMessage(prev.content + chunk));
      
      console.log(chunk)
    }

  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
  }
};
