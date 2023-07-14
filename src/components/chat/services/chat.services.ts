import { config } from "@/config";
import { Message } from "../lib/chat.lib";

export function fetchChatAPI(messages : Message[]): EventSource{
    const API_URL = config.api.url
    const stringMessages = JSON.stringify(messages)
    const source = new EventSource(`${API_URL}/chat/events/${stringMessages}`);

    return source
}