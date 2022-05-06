import * as express from 'express';
import * as dotenv from 'dotenv'
import Projects from "../models/projects";
import {MysqlError} from "mysql";
import helpers from '../services/helpers';
import {UsersInterface} from "../interfaces/models/usersInterface";
import Experiences from "../models/experiences";

const router = express.Router();
// get config vars
dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
const experience = new Experiences("experiences")
const project = new Projects("projects")
/**
 * Routes to Experiences
 */
router.get('/', async function (_req, res) {
    await experience.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', helpers.authenticateToken, async function (req, res, next) {
    let body = req.body
    await experience.create(body, (err1: MysqlError | null) => {
        if (err1) throw res.json(err1?.sqlMessage);
        res.status(200).send({message: 'The experience has been add', code: 200})
    });
})
router.patch('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.description || body.image) {
        await experience.update(body, parseInt(req.params.id), (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The experience has been update', code: 200})
        });
    }
})
router.get('/:id', async function (req, res){
    await experience.find(parseInt(req.params.id), 1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    await experience.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The experience has been delete', code: 200})
    })
})


export default router
