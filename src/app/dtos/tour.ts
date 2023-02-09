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
    approxDuration: string
    creation: Date
    lastUpdate: Date
    stops: TourStop[]
    reviews: Review[]
    reports: Report[]
    suggestions: Suggestion[]   // empty if is not author
}

export interface TourSearchDTO {
    cityId: number
    approxDuration: string
    tagsIds: number[]
    themeId: number
}

export interface TourDTO {
    title: string
    cityId: number
    tags: TagDTO[]
    theme: ThemeDTO
    approxCost: number
    approxDuration: string
    stops: TourStopDTO[]    // unlike tags and themes, stops are created contextually to tour
}

export interface TourStop {
    id: number
    title: string
    latitude: number
    longitude: number
    index: number
    description: string
    cost: number
    duration: string
    transportDTO: TourStopTransportDTO
    images: Blob[]
}

export interface TourStopDTO {
    title: string
    latitude: number
    longitude: number
    description: string
    cost: number
    duration: string
    transportDTO: TourStopTransportDTO
    images: Blob[]
}

export interface TourStopTransportDTO {
    transferCost: number
    transferDuration: string
    transferType: string
    transferDetails: string
    transferOtherOptions: string
}

export interface Review {
    id: number
    author: Tourist
    title: string
    stars: number
    timeStamp: Date
    content: string
    images: Blob[]
}

export interface ReviewDTO {
    tourId: number
    title: string
    stars: number
    timeStamp: Date
    content: string
    images: Blob[]
}

export interface Report {
    id: number
    author: Tourist
    reason: string
}

export interface ReportDTO {
    tourId: number
    reason: string
}

export interface Suggestion {
    id: number
    author: Tourist
    description: string
}

export interface SuggestionDTO {
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
