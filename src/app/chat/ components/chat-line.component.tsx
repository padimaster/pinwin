import { nanoid } from "nanoid";
import Image from "next/image";
import { Message } from "../schemas/chat.schemas";
import { IMAGES } from "@/lib/images.lib";
import ChatSource from "./chat-source.component";
import { sourceDocumentProps } from "../types/chat.types";

interface ChatLineProps {
  message: Message;
}

export default function ChatLine({ message }: ChatLineProps) {
  const { content, role } = message;
  const positionClass =
    role === "user" ? "col-start-2 col-end-13" : "col-start-1 col-end-12";
  const flowClass = role === "user" ? "flex-row-reverse" : "flex-row";
  const marginClass = role === "user" ? "mr-3" : "ml-3";
  const avatarSrc = role === "user" ? IMAGES.CHAT.DEFAULT : IMAGES.CHAT.AI;

  return (
    <div key={nanoid()} className={`${positionClass} p-1 rounded-lg `}>
      <div className={`flex items-start justify-start ${flowClass}`}>
        <div className='flex items-center justify-center h-7 w-7 md:h-10 md:w-12 pt-2 flex-shrink-0'>
          <Image
            className='rounded-full bg-blue-500 md:h-12 md:w-16'
            src={avatarSrc}
            width={200}
            height={100}
            alt='avatar'
          />
        </div>
        <div>
          <div
            className={`relative ${marginClass} sm:text-sm md:text-md lg:text-xl min-h-full h-auto bg-white py-2 px-4 shadow rounded-xl text-justify`}
          >
            {content}
          </div>

          {message &&
            message.sourceDocuments &&
            message.sourceDocuments.map(
              (sourceDocument: sourceDocumentProps) => (
                <ChatSource source={sourceDocument} key={nanoid()} />
              )
            )}
        </div>
      </div>
    </div>
  );
}