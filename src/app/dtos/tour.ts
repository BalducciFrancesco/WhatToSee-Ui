import { Guide, Tourist } from "./user"

export interface Tour {
    id?: number
    author: Guide
    title: string
    city: City
    tags: Tag[]
    theme: Theme
    approxCost: number
    approxDuration: number
    creation: Date
    lastUpdate: Date
    stops: TourStop[]
}

export interface TourStop {
    id?: number
    latitude: number
    longitude: number
    index: number
    description: string
    cost: number
    duration: number
    transferCost: number
    transferDuration: number
    transferType: string
    transferDetails: string
    otherOptions: string
    photos: Blob[]
}

export interface Review {
    id?: number
    author: Tourist
    tour: Tour
    title: string
    stars: number
    timeStamp: Date
    content: string
    photos: Blob[]
}

export interface Report {
    id?: number
    author: Tourist
    tour: Tour
    reason: string
}

export interface Suggestion {
    id?: number
    author: Tourist
    tour: Tour
    description: string
}

export interface City {
    id?: number
    name: string
}

export interface Tag {
    id?: number
    name: string
}

export interface Theme {
    id?: number
    name: string
}
