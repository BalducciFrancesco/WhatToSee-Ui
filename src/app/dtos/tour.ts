import { Guide, Tourist } from "./user"

// DTO = as sent to BE, removed sub-entities and id, lazy, POST request
// NON-DTO = as recieved form BE, entity, eager, GET response

export interface Tour {
    id: number
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

export interface TourDTO {
    authorId: number
    title: string
    cityId: number
    tagsId: number[]
    themeId: number
    approxCost: number
    approxDuration: number
    creation: Date
    lastUpdate: Date
    stops: TourStopDTO[]    // unlike tags and themes, stops are created contextually to tour
}

export interface TourStop {
    id: number
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

export interface TourStopDTO {
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
    id: number
    author: Tourist
    tour: Tour
    title: string
    stars: number
    timeStamp: Date
    content: string
    photos: Blob[]
}

export interface ReviewDTO {
    authorId: number
    tourId: number
    title: string
    stars: number
    timeStamp: Date
    content: string
    photos: Blob[]
}

export interface Report {
    id: number
    author: Tourist
    tour: Tour
    reason: string
}

export interface ReportDTO {
    authorId: number
    tourId: number
    reason: string
}

export interface Suggestion {
    id: number
    author: Tourist
    tour: Tour
    description: string
}

export interface SuggestionDTO {
    authorId: number
    tourId: number
    description: string
}

export interface City {
    id: number
    name: string
}

export interface CityDTO {
    name: string
}

export interface Tag {
    id: number
    name: string
}

export interface TagDTO {
    name: string
}

export interface Theme {
    id: number
    name: string
}

export interface ThemeDTO {
    name: string
}
