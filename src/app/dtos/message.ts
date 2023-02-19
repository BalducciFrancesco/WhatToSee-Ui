import { Guide, PlatformUser, Tourist } from "./user";

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface Message {
    id: number
    sender: PlatformUser
    reciever: PlatformUser
    content: string
    creationTimeStamp: Date
}

export interface Conversations {
    guides: Guide[]
    tourists: Tourist[]
}

export interface MessageDTO {
    recieverId: number
    content: string
    creationTimeStamp: Date
}