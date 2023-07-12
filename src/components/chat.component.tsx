'use client'

import React from 'react'
import Image from 'next/image'
import { useChat } from 'ai/react'
import SendIcon from '@mui/icons-material/Send'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
 
  return (
    <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-200 w-[800px] h-[500px] m-4 p-4 border border-gray-300">
      <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col w-full h-full">
          <div className="grid grid-cols-12 gap-y-2">
          {messages.map(m => (
            <ChatLine message={m} />
          ))}
          </div>
        </div>
      </div>
 
      <div className='w-full bottom-0 left-0'>
        <form onSubmit={handleSubmit} className='flex flex-row w-full px-2 md:px-5 py-3 mt-4'>
          <label htmlFor='chat'></label>
          <div className='flex flex-row items-center h-16 bg-white w-full px-4 border rounded-xl border-gray-300 hover:border-gray-400'>
            <div className='flex-grow'>
              <input
                  className="flex w-full focus:outline-none px-4 h-10"
                  value={input}
                  onChange={handleInputChange}
                  id='chat'
                  type='text'
                  autoComplete='off'
                  name='chat'
                  placeholder='Escribe una pregunta'
                />
            </div>
              <div className="ml-4">
                <button
                  className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-full text-white px-4 py-2 flex-shrink-0"
                >
                  <SendIcon sx={{ fontSize: { xs: 20, sm: 30, md: 25 } }} />
                </button>
              </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function ChatLine(message:any) {
  const { id, content, role } = message.message
  const positionClass = role === 'user' ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'
  const flowClass = role === 'user' ? 'flex-row-reverse' : 'flex-row'
  const marginClass = role === 'user' ? 'mr-3' : 'ml-3'

  return (
    <div className={`${positionClass} p-3 rounded-lg`} id={id}>
      <div className={`flex items-center ${flowClass}`}>
        <div
          className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
        >
          <Image
            src={'/images/dragoni.png'}
            width={50}
            height={50}
            alt="Dragoni"
          />
        </div>
        <div
            className={`relative ${marginClass} text-md h-10 bg-white py-2 px-4 shadow rounded-xl`}
          >
            {content}
        </div>
      </div>
    </div>
  )
}
