
// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

/**
 * A user.
 */
export interface User {
    id: number
    username: string    // trimmed and case insensitive
    firstName: string   // trimmed
    lastName: string    // trimmed
    role: UserRole
}

/**
 * Role associated with a user.
 * Corresponds to the values of the UserRole enum in the BE.
 */
export enum UserRole {
    TOURIST, GUIDE, ADMINISTRATOR
}

/**
 * DTO for logging in a user.
 */
export interface UserLoginDTO {
    username: string    // trimmed and case insensitive, must be unique
    password: string    
}

/**
 * DTO for registering a user.
 * Must also specify role in service.
 */
export interface UserRegisterDTO extends UserLoginDTO {
    firstName: string   // trimmed
    lastName: string    // trimmed
}
