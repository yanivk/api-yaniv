import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";
import {FormationsInterface} from "../interfaces/models/formationsInterface";
import Skills from "./skills";

const skill = new Skills("skills")

export default class Formations extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    create(formation: FormationsInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO formations (name, description, location, date, degree, institute, users) VALUES (?,?,?,?,?,?,?)',
            [formation.name, formation.description, formation.location, new Date(formation.date), formation.degree, formation.institute, formation.user],
            param
        );
    }
    skillsCreation(formation: FormationsInterface, formationId: number, isSkillExist: boolean = false) {
        if (formation.skills) {
            if (isSkillExist) {
                formation.skills.forEach(async (value, _key) => {
                    await this.setFormationSkill(formationId, value.id)
                })
            } else {
                formation.skills.forEach(async (value, _key) => {
                    await skill.create(value, (err, results) => {
                        if (err) throw err
                        this._db.query(
                            'INSERT INTO skills_formations (skills_id, formations_id) VALUES (?,?)',
                            [results.insertId, formationId]
                        )
                    })
                })
            }

        }
    }

    setFormationSkillsExist(oldsValues: {formationId: number, skillId: number}, updateValues: {formationId: number, skillId: number},  param?: queryCallback) {
        return this._db.query(
            'UPDATE skills_formations SET formations_id = ?, skills_id = ? WHERE formations_id = ? AND skills_id = ?',
            [updateValues.formationId, updateValues.skillId, oldsValues.formationId, oldsValues.skillId],
            param
        )
    }

    private async setFormationSkill(formationId: number, skillId: number) {
        await this._db.query(
            'INSERT INTO skills_formations (skills_id, formations_id) VALUES (?,?)',
            [skillId, formationId]
        )
    }
}
