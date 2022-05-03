import { ExperiencesInterface } from "./experiencesInterface";
import {ProjectsInterface} from "./projectsInterface";
import {FormationsInterface} from "./formationsInterface";
import {SkillsInterface} from "./skillsInterface";

export interface UsersInterface {
    id: number
    firstname: string
    lastname: string
    mail: string
    password: string
    token: string
    roles: [],
    experiences: ExperiencesInterface[]
    projects: ProjectsInterface[]
    formations: FormationsInterface[]
    skills: SkillsInterface[]
}
