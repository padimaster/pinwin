import { sourceDocumentProps } from "../types/chat.types";

export class Message implements Message {
  role: string;
  content: string;
  sourceDocuments?: any;

  constructor(role: string, content: string) {
    this.role = role;
    this.content = content;
  }

  setSourceDocuments(sourceDocuments: sourceDocumentProps[]) {
    this.sourceDocuments = sourceDocuments;
  }
}

export class HumanMessage extends Message {
  constructor(content: string) {
    super("user", content);
  }
}

export class AIMessage extends Message {
  constructor(content: string) {
    super("ai", content);
  }
}
