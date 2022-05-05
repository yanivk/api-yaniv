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
            'INSERT INTO projects (name, description, created_at, image) VALUES (?,?,?,?)',
            [project.name, project.description, helper.formatDate(new Date()), project.image],
            param
        );
    }

    update(project: ProjectsInterface, id: number, param?: queryCallback) {
        let query = 'UPDATE projects SET '
        let parameters: any[] = []
        Object.keys(project).forEach((value, index, array) => {
            if (array.length - 1 === index){
                query += `${value} = ? `
            } else {
                query += `${value} = ?,`
            }
            // @ts-ignore
            parameters = [...parameters, project[value]]
        })
        query += 'WHERE id = ?'
        return this._db.query(
            query,
            [...parameters, id],
            param
        );
    }
}
