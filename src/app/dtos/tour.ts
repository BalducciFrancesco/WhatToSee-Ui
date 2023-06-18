import { User } from "./user"

// DTO = as sent to BE service, removed sub-entities and id (or extracted from service), lazy, POST request
// NON-DTO = as received form BE, entity, eager, GET response

/**
 * A tour.
 */
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

/**
 * Actions that the user is allowed to perform on a given tour.
 */
export interface TourActions {
    createReport: boolean  // true if user can create a report for this tour
    sendMessage: boolean // true if user can send a message to the author of this tour
    markAsCompleted: boolean // true if user can mark this tour as completed
    review: boolean // true if user can review this tour
    edit: boolean   // true if user can edit this tour
    delete: boolean // true if user can delete this tour
    viewReports: boolean    // true if user can view reports for this tour
}

/**
 * DTO for searching for tours.
 * All fields are optional.
 */
export interface TourSearchDTO {
    city?: City
    approxDuration?: string  // will return tours with <= this value
    tags?: Tag[]
    theme?: Theme
}

/**
 * DTO for creating or editing a tour.
 */
export interface TourDTO {
    title: string
    description: string
    isPublic: boolean
    city: City
    tagNames: string[]  // can be empty
    theme: Theme
    approxCost: number
    approxDuration: string
    sharedTourists?: User[] // can be empty or undefined if public
    stops: StopDTO[]
}

/**
 * A tour stop.
 */
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

/**
 * DTO for creating or editing a tour stop.
 */
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

/**
 * A tour review.
 */
export interface Review {
    id: number
    author: User
    timestamp: Date
    stars: number   // 1-5
    description: string
}

/**
 * DTO for creating a tour review.
 */
export interface ReviewDTO {
    stars: number
    description: string
}

/**
 * A tour report.
 */
export interface Report {
    id: number
    author: User
    description: string
}

/**
 * DTO for creating a tour report.
 */
export interface ReportDTO {
    description: string
}

/**
 * A tour city.
 */
export interface City {
    id: number
    name: string
}

/**
 * A tour tag.
 */
export interface Tag {
    id: number
    name: string
}

/**
 * DTO for creating or re-using a tour tag.
 */
export interface TagDTO {
    name: string
}

/**
 * A tour theme.
 */
export interface Theme {
    id: number
    name: string
}
