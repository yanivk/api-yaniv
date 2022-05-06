import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";
import {ExperiencesInterface} from "../interfaces/models/experiencesInterface";

export default class Experiences extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    create(experience: ExperiencesInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO experiences (name, description, company_name, location, startDate, endDate, is_in_progress) VALUES (?,?,?,?,?,?,?)',
            [experience.name, experience.description, experience.companyName, experience.location, experience.startDate, experience.endDate, experience.isInProgress],
            param
        );
    }
}
