import { Guide, Tourist } from "./user";

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface Conversation {
    id: number
    guide: Guide
    tourist: Tourist
    messages: Message[] | null  // null in messages center response
}

export interface ConversationDTO {  // only tourists can create a conversation
    guideId: number
    message: string
}

export interface Message {
    id: number
    content: string
    direction: boolean  // true if guide -> tourist, false if tourist -> guide
    timestamp: Date
}
