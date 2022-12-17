import { PlatformUser } from "./user";

export interface Message {
    id: number
    sender: PlatformUser
    reciever: PlatformUser
    content: string
    timestamp: Date
}