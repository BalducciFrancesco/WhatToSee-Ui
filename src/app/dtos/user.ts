import { City } from "./tour"

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface User {
    id: number
    username: string
    password: string
}

export interface UserDTO {
    username: string
    password: string
}

export interface Administrator extends User {
}

export interface AdministratorDTO extends UserDTO {
}

export interface PlatformUser extends User {
    firstName: string
    lastName: string
}

export interface PlatformUserDTO extends UserDTO {
    firstName: string
    lastName: string
}

export interface Guide extends PlatformUser {
    organizationName: string
    favouriteCity: City
}

export interface GuideDTO extends PlatformUserDTO {
    organizationName: string
    favouriteCityId: number
}

export interface Tourist extends PlatformUser {
    // completedTours: Tour[] -- li recuperiamo a parte? altrimenti ogni volta che prendo un tursita mi tiro giù tutto
}

export interface TouristDTO extends PlatformUserDTO {
    // completedTours: Tour[] -- non esistono al momento della creazione
}
