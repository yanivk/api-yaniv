import helper from '../services/helpers';
import { ProjectsInterface } from "../interfaces/models/projectsInterface";
import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";

export default class Projects extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    create(project: ProjectsInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO projects (name, description, created_at, image, users) VALUES (?,?,?,?, ?)',
            [project.name, project.description, helper.formatDate(new Date()), project.image, project.user],
            param
        );
    }

    updateExperienceProject(experienceId: number, projectId:number, param?: queryCallback) {
        return this._db.query(
            'UPDATE projects SET experiences = ? WHERE id = ?',
            [experienceId, projectId],
            param
        )
    }
}
