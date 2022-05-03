import helper from '../services/helpers';
import { ProjectsInterface } from "../interfaces/models/projectsInterface";
import ModelsClass from "../class/modelsClass";

export default class Projects extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    async create(project: ProjectsInterface, param?: Function) {
        return await this._db.query(`INSERT INTO project (name, description, created_at, image)
                               VALUES ("${project.name}", "${project.description}", "${helper.formatDate(new Date())}", "${project.image}")`, param);
    }
}
