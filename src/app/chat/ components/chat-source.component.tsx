import { nanoid } from "ai";
import React from "react";
import { MessageResponse, sourceDocumentProps } from "../types/chat.types";
import { config } from "@/config";

export default function ChatSource({
  source,
}: {
  source: sourceDocumentProps;
}) {
  const {
    metadata: { docPath, pageContent },
  } = source;

  const slicedContent = pageContent.substring(0, 100);
  const filePath = docPath.substring(
    docPath.indexOf("public") + "public".length
  );
  const fileName = docPath.substring(docPath.lastIndexOf("/") + 1);
  const url = `${config.api.url}${filePath}`;
  console.log(url);

  return (
    <div
      className='lg:text-lg bg-gray-300 py-2 px-4 ml-3 shadow rounded-xl text-justify mt-2'
      key={nanoid()}
    >
      <p>
        <strong>Fuente:</strong>
        {" " + slicedContent}
      </p>

      <a className='underline-offset-1' href={url} target='_blank'>
        <p className='mt-1'>
          <strong>Acceder al recurso:</strong>
          {" " + fileName} <br />
        </p>
      </a>
    </div>
  );
}
