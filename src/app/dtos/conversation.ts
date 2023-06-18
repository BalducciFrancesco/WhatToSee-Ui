import { User } from "./user";

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

/**
 * A conversation between a tourist and a guide.
 * @see Message
 */
export interface Conversation {
    id: number
    guide: User
    tourist: User
    messages: Message[] | null  // null in messages center response
}

/**
 * DTO for creating a conversation.
 * Note that only tourists can create a conversation.
 */
export interface ConversationDTO {
    guideId: number
    message: string
}

/**
 * A message in a conversation.
 * @see Conversation
 */
export interface Message {
    id: number
    content: string
    direction: boolean  // true if guide -> tourist, false if tourist -> guide
    timestamp: Date
}

/**
 * DTO for sending a message in an existing conversation.
 */
export interface MessageDTO {
    content: string
    conversationId: number
}
