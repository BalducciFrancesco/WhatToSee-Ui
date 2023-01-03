import { PlatformUser } from "./user";

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface Message {
    id: number
    sender: PlatformUser
    reciever: PlatformUser
    content: string
    timestamp: Date
}

export interface MessageDTO {
    senderId: number
    recieverId: number
    content: string
    timestamp: Date
}