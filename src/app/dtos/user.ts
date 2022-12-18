import { City } from "./tour"

export interface User {
    id?: number
    username: string
    password: string
}

export interface Administrator extends User {
}

export interface PlatformUser extends User {
    firstName: string
    lastName: string
}

export interface Guide extends PlatformUser {
    organizationName: string
    favouriteCity: City
}

export interface Tourist extends PlatformUser {
    // completedTours: Tour[] -- li recuperiamo a parte? altrimenti ogni volta che prendo un tursita mi tiro giù tutto
}
