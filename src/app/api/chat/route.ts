import { StreamingTextResponse, LangChainStream, Message } from 'ai'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { AIMessage, HumanMessage } from 'langchain/schema'
import { ConversationalRetrievalQAChain } from 'langchain/chains'
import { BufferMemory } from "langchain/memory";
import {useChat} from 'ai/react'
 
export const runtime = 'edge'

export async function POST(req: Request) {
  /* const { messages } = await req.json()
 
  const llm = new ChatOpenAI({
    streaming: true
  })


  const memory = new BufferMemory({
      memoryKey: "chat_history", // Must be set to "chat_history"
  })  

  const qaConversationalchain = ConversationalRetrievalQAChain.fromLLM(llm, vectorDB.asRetriever(), {
    memory,
  });

  const question = "que es deber del estado?"

  const result = await qaConversationalchain.call({ question });
  console.log("result", result); 

  const { stream, handlers } = LangChainStream()
 
  llm
    .call(
      (messages as Message[]).map(m =>
        m.role == 'user'
          ? new HumanMessage(m.content)
          : new AIMessage(m.content)
      ),
      {},
      [handlers]
    )
    .catch(console.error)
 
  return new StreamingTextResponse(stream) */
}