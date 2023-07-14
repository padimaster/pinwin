"use client";

import React from "react";
import Image from "next/image";
import SendIcon from "@mui/icons-material/Send";
import { useChat } from "../hooks/chat.hooks";
import { AIMessage, HumanMessage, Message } from "../schemas/chat.schemas";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const welcomeMessage = new AIMessage(
    "Hola, soy tu asistente virtual. ¿En qué puedo ayudarte?"
  );

  return (
    <div className='flex relative flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 w-[90%] max-w-[900px] h-[70%] max-h-[800px] m-4 p-4 border border-gray-300'>
      <h3 className='font-bold text-xl md:text-2xl lg:text-3xl text-center px-4 py-1 text-black mb-5'>
        Consulta tus dudas legales con Dragoni
      </h3>

      <div className='flex flex-col h-full overflow-x-auto mb-20'>
        <div className='flex flex-col w-full h-full'>
          <div className='grid grid-cols-12 gap-y-2'>
            <ChatLine message={welcomeMessage} />
            {messages.map((m : Message) => (
              <ChatLine message={m} />
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
          <div className='flex flex-row items-center h-16 w-full px-4 border rounded-xl bg-white border-gray-300 hover:border-gray-400'>
            <div className='flex-grow'>
              <input
                className='flex w-full focus:outline-none px-4 h-10'
                value={input}
                onChange={handleInputChange}
                id='chat'
                type='text'
                autoComplete='off'
                name='chat'
                placeholder='Escribe una pregunta'
              />
            </div>
            <div className='ml-4'>
              <button className='flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-full text-white px-4 py-2 flex-shrink-0'>
                <SendIcon sx={{ fontSize: { xs: 20, sm: 30, md: 25 } }} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChatLine({ message }: { message: Message}) {
  const { content, role } = message;
  
  const positionClass =
    role === "user" ? "col-start-2 col-end-13" : "col-start-1 col-end-12";
  const flowClass = role === "user" ? "flex-row-reverse" : "flex-row";
  const marginClass = role === "user" ? "mr-3" : "ml-3";
  const avatarSrc = role === "user" ? "/logo.gn" : "/logo.svg";

  return (
    <div className={`${positionClass} p-1 rounded-lg `}>
      <div className={`flex items-start justify-start ${flowClass}`}>
        <div className='flex items-center justify-center h-7 w-7 md:h-10 md:w-10 flex-shrink-0'>
          <Image
            className='rounded-full bg-blue-500'
            src={avatarSrc}
            width={50}
            height={50}
            alt='Dragoni'
          />
        </div>
        <div
          className={`relative ${marginClass} sm:text-sm md:text-md lg:text-xl h-auto bg-white py-2 px-4 shadow rounded-xl text-justify`}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
