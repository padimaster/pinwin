export class Message {
  role: string;
  content: string;

  constructor(role: string, content: string) {
    this.role = role;
    this.content = content;
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
