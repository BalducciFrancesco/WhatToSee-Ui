import { User } from "./user"

// DTO = as sent to BE service, removed sub-entities and id (or extracted from service), lazy, POST request
// NON-DTO = as received form BE, entity, eager, GET response

export interface Tour {
    id: number
    author: User
    title: string
    description: string
    isPublic: boolean
    city: City
    tags: Tag[]
    theme: Theme
    approxCost: number
    approxDuration: string
    creationDate: Date
    stops: Stop[]
    reviews: Review[]
    markedAsCompletedCount: number
}

export interface TourActions {
    createReport: boolean
    sendMessage: boolean
    markAsCompleted: boolean
    review: boolean
    edit: boolean
    delete: boolean
    viewReports: boolean
}

export interface TourSearchDTO {
    city?: City
    approxDuration?: string  // will return tours with <= this value
    tags?: Tag[]
    theme?: Theme
}

export interface TourDTO {
    title: string
    description: string
    isPublic: boolean
    city: City
    tagNames: string[]               // can be empty
    theme: Theme
    approxCost: number
    approxDuration: string
    sharedTourists?: User[]   // can be empty
    stops: StopDTO[]
}

export interface Stop {
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

export interface StopDTO {
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
    author: User
    timestamp: Date
    stars: number   // 1-5
    description: string
}

export interface ReviewDTO {
    stars: number
    description: string
}

export interface Report {
    id: number
    author: User
    description: string
}

export interface ReportDTO {
    description: string
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
