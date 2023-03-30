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
    creationDate: Date
    stops: TourStop[]
    reviews: Review[]
    reports: Report[]
}

export interface TourSearchDTO {
    cityId: number
    approxDuration: string
    tags: string[]
    themeId: number
}

export interface TourDTO {
    title: string
    cityId: number
    tags: string[]
    themeId: number
    approxCost: number
    approxDuration: string
    stops: TourStopDTO[]
}

export interface TourStop {
    id: number
    title: string
    description: string
    cost: number
    duration: string
    transferCost: number
    transferDuration: string
    transferType: string
    transferDetails: string
    transferOtherOptions: string | null
}

export interface TourStopDTO {
    title: string
    description: string
    cost: number
    duration: string
    transferCost: number
    transferDuration: string
    transferType: string
    transferDetails: string
    transferOtherOptions: string | null
}

export interface Review {
    id: number
    author: Tourist
    timestamp: Date
    stars: number
    description: string
}

export interface ReviewDTO {
    stars: number
    description: string
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

export interface City {
    id: number
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
