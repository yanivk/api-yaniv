import * as express from 'express';
import * as dotenv from 'dotenv'
import Projects from "../models/projects";
import Users from "../models/users"
import {MysqlError} from "mysql";
import helpers from '../services/helpers';
import {UsersInterface} from "../interfaces/models/usersInterface";
import Experiences from "../models/experiences";
import {ExperiencesInterface} from "../interfaces/models/experiencesInterface";

const router = express.Router();
// get config vars
dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
const project = new Projects("projects")
const user = new Users("users")
const experience = new Experiences("experiences")
/**
 * Routes to projects
 */
router.get('/', async function (_req, res) {
    await project.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', helpers.authenticateToken, async function (req, res, next) {
    let body = req.body

    const userInformation: JWTResponse | null = helpers.getUserInformationFromToken(req, res, next)

    if (body.name && body.description && body.image) {
        if (typeof userInformation?.mail === 'string') {
            await user.findByMail(userInformation.mail,async (err: MysqlError | null, result: UsersInterface[]) => {
                if (err) throw res.json(err?.sqlMessage);
                body.user = result[0].id
                await project.create(body, (err1: MysqlError | null, results) => {
                    if (err1) throw res.json(err1?.sqlMessage);
                    if (body.experiences.id) {
                        project.updateExperienceProject(body.experiences.id, results.insertId)
                    } else {
                        experience.create(body.experiences, ((err2: MysqlError | null, results1) => {
                            if (err2) throw res.json(err2?.sqlMessage);
                            project.updateExperienceProject(results1.insertId, results.insertId)
                        }))
                    }
                    if (body.skills && (body.skills[0].name || body.skills[0].image)) {
                        project.skillsCreation(body, results.insertId)
                    } else {
                        project.skillsCreation(body, results.insertId, true)
                    }
                    res.status(200).send({message: 'The project has been add', code: 200})
                });
            })
        }

    }
})

router.post('/:pid/skills/:sid', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.project_id && body.skill_id) {
        await project.setFormationSkillsExist({
            projectId: parseInt(req.params.bid),
            skillId: parseInt(req.params.cid)
        }, {
            projectId: body.formation_id,
            skillId: body.skill_id
        }, (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage)
            res.status(200).send({message: 'The project skill has been update'})
        })
    }
})

router.patch('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.description || body.image) {
        await project.update(body, parseInt(req.params.id), (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The project has been update', code: 200})
        });
    }
})
router.get('/:id', async function (req, res){
    await project.find(parseInt(req.params.id), 1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    await project.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The project has been delete', code: 200})
    })
})


export default router
