"use client";

import React, { useEffect, useRef } from "react";
import SendIcon from "@mui/icons-material/Send";
import { nanoid } from "nanoid";
import { useChat } from "../hooks/chat.hooks";
import { AIMessage, HumanMessage, Message } from "../schemas/chat.schemas";
import { CHAT_WELCOME_MESSAGE, CHAT_TITLE } from "../lib/chat.lib";
import ChatLine from "./chat-line.component";

export default function Chat() {
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  useEffect(() => {
    // Scroll to the bottom of the chat when messages are updated
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const welcomeMessage = new AIMessage(CHAT_WELCOME_MESSAGE);

  return (
    <div
      className={`flex relative flex-col flex-auto flex-shrink-0 rounded-2xl white w-[80vw] h-[80vh] max-w-[800px] max-h-[900px] p-1 md:p-4 border bg-gray-50 shadow-sm border-gray-200`}
    >
      <h3 className='font-bold text-xl md:text-2xl lg:text-3xl text-center px-4 text-black my-3 md:my-5'>
        {CHAT_TITLE}
      </h3>

      <div ref={chatRef} className='flex flex-col h-full overflow-x-auto mb-20'>
        <div className='flex flex-col w-full h-full'>
          <div className='grid grid-cols-12 gap-y-2'>
            <ChatLine message={welcomeMessage} key={nanoid()}/>
            {messages.map((m: Message) => (
              <ChatLine message={m} key={nanoid()}/>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full absolute bottom-0 left-0'>
        <form
          onSubmit={handleSubmit}
          className='flex flex-row w-full px-2 md:px-5 py-3 mt-4'
        >
          <label htmlFor='chat'></label>
          <div className='flex flex-row items-center h-12 md:h-16 w-full px-4 border rounded-xl bg-white border-gray-300 hover:border-gray-400'>
            <div className='flex-grow'>
              <input
                className='flex w-full focus:outline-none px-2 md:px-4 h-8 md:h-10'
                value={input}
                onChange={handleInputChange}
                id='chat'
                type='text'
                autoComplete='off'
                name='chat'
                placeholder='Escribe una pregunta'
              />
            </div>
            <div className='ml-2 md:ml-4'>
              <button className='flex items-center justify-center text-indigo-500 flex-shrink-0'>
                <SendIcon sx={{ fontSize: { xs: 25, sm: 30, md: 25 } }} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
