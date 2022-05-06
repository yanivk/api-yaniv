import {SkillsInterface} from "./skillsInterface";
import {UsersInterface} from "./usersInterface";
import {ExperiencesInterface} from "./experiencesInterface";

export interface ProjectsInterface {
    id: number
    name: string
    description: string
    created_at: Date
    image?: string
    user: number
    skills: SkillsInterface[]
    experiences?: ExperiencesInterface[]
}
