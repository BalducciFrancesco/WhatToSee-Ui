import { City } from "./tour"

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface User {
    id: number
    username: string
    firstName: string
    lastName: string
    role: UserRole
}

export enum UserRole {
    TOURIST, GUIDE, ADMINISTRATOR
}

export interface UserDTO {
    username: string
    password: string
}

export interface Administrator extends User {
}

export interface AdministratorDTO extends UserDTO {
}

export interface Guide extends User {
}

export interface GuideDTO extends UserDTO {
}

export interface Tourist extends User {
}

export interface TouristDTO extends UserDTO {
}
