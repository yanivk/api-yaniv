export interface ExperiencesInterface {
    id: number
    name: string
    description: string
    companyName?: string
    location?: string
    startDate: Date
    endDate?: Date
    isInProgress: boolean
}
