import { SkillsInterface } from "./skillsInterface";

export interface FormationsInterface {
    id: number
    name: string
    description: string
    location: string
    date: Date
    degree?: string
    institute: string
    skills: SkillsInterface[]
}
