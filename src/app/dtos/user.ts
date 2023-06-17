
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

export interface UserLoginDTO {
    username: string
    password: string
}

export interface UserRegisterDTO extends UserLoginDTO {
    firstName: string
    lastName: string
}
