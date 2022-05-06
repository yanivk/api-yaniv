import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";
import {FormationsInterface} from "../interfaces/models/formationsInterface";

export default class Formations extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    create(formation: FormationsInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO formations (name, description, location, date, degree, institute) VALUES (?,?,?,?,?,?)',
            [formation.name, formation.description, formation.location, formation.date, formation.degree, formation.institute],
            param
        );
    }
}
