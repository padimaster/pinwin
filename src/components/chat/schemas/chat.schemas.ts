export class Message implements Message{
  role: string;
  content: string;
  source?: any;

  constructor(role: string, content: string) {
    this.role = role;
    this.content = content;
  }

  setSource(source: string) {
    this.source = source;
  }
}

export class HumanMessage extends Message {
  constructor(content : string) {
    super("user", content);
  }
}

export class AIMessage extends Message {
  constructor(content : string) {
    super("ai", content);
  }
}
