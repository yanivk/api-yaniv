import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";
import {SkillsInterface} from "../interfaces/models/skillsInterface";

export default class Skills extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    create(skill: SkillsInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO skills (name, image) VALUES (?,?)',
            [skill.name, skill.image],
            param
        );
    }
}
