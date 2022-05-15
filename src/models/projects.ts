import helper from '../services/helpers';
import {ProjectsInterface} from "../interfaces/models/projectsInterface";
import ModelsClass from "../class/modelsClass";
import {Query, queryCallback} from "mysql";
import Skills from "./skills";
import config from "../config";

const skill = new Skills("skills")
export default class Projects extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    findAll(page = 1, params?: queryCallback): Promise<Query> {
        const offset = helper.getOffset(page, config.listPerPage);
        return this._db.query(`SELECT p.*,
                                      CONCAT('[',
                                             GROUP_CONCAT(
                                                     JSON_OBJECT(
                                                             'id', s.id,
                                                             'name', s.name,
                                                             'image', s.image
                                                         ))
                                          , ']')
                                          as skills
                               FROM projects as p
                                        LEFT JOIN projects_skills as ps ON p.id = ps.project_id
                                        LEFT JOIN skills as s ON ps.skill_id = s.id
                               GROUP BY p.id LIMIT ?, ?`,
            [offset, config.listPerPage], params);
    }

    create(project: ProjectsInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO projects (name, description, created_at, image, users) VALUES (?,?,?,?, ?)',
            [project.name, project.description, helper.formatDate(new Date()), project.image, project.user],
            param
        );
    }

    skillsCreation(project: ProjectsInterface, projectId: number, isSkillExist: boolean = false) {
        if (project.skills) {
            if (isSkillExist) {
                project.skills.forEach(async (value, _key) => {
                    await this.setProjectSkill(projectId, value.id)
                })
            } else {
                project.skills.forEach(async (value, _key) => {
                    await skill.create(value, (err, results) => {
                        if (err) throw err.sqlMessage
                        this._db.query(
                            'INSERT INTO projects_skills (project_id, skill_id) VALUES (?,?)',
                            [projectId, results.insertId]
                        )
                    })
                })
            }

        }
    }

    updateExperienceProject(experienceId: number, projectId: number, param?: queryCallback) {
        return this._db.query(
            'UPDATE projects SET experiences = ? WHERE id = ?',
            [experienceId, projectId],
            param
        )
    }

    setFormationSkillsExist(oldsValues: { projectId: number, skillId: number }, updateValues: { projectId: number, skillId: number }, param?: queryCallback) {
        return this._db.query(
            'UPDATE projects_skills SET project_id = ?, skill_id = ? WHERE project_id = ? AND skill_id = ?',
            [updateValues.projectId, updateValues.skillId, oldsValues.projectId, oldsValues.skillId],
            param
        )
    }

    private async setProjectSkill(projectId: number, skillId: number) {
        await this._db.query(
            'INSERT INTO projects_skills (project_id, skill_id) VALUES (?,?)',
            [projectId, skillId]
        )
    }
}
