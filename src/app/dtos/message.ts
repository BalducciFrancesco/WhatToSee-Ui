import { Guide, Tourist } from "./user";

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface Conversation {
    id: number
    guide: Guide
    tourist: Tourist
    messages: Message[]
}

export interface Message {
    id: number
    content: string
    direction: boolean
    timestamp: Date
}

export interface ConversationDTO {
    guideId: number
    messages: MessageDTO[]
}

export interface MessageDTO {
    conversationId: number
    content: string
}