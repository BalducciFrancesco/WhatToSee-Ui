import { Guide, Tourist } from "./user"

// DTO = as sent to BE service, removed sub-entities and id (or extractede from service), lazy, POST request
// NON-DTO = as received form BE, entity, eager, GET response

export interface Tour {
    id: number
    author: Guide
    title: string
    description: string
    isPublic: boolean
    city: City
    tags: Tag[]
    theme: Theme
    approxCost: number
    approxDuration: string
    creationDate: Date
    stops: TourStop[]
    reviews: Review[]
}

export interface TourSearchDTO {
    cityId: number
    approxDuration: string
    tags: string[]
    themeId: number
}

export interface TourDTO {
    title: string
    description: string
    isPublic: boolean
    city: City
    tags: string[]               // can be empty
    theme: Theme
    approxCost: number
    approxDuration: string
    sharedTourists?: Tourist[]   // can be empty
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
