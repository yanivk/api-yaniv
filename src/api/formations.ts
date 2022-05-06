import * as express from 'express';
import * as dotenv from 'dotenv'
import Formations from "../models/formations";
import users from "../models/users"
import {MysqlError} from "mysql";
import helpers from '../services/helpers';
import {UsersInterface} from "../interfaces/models/usersInterface";

const router = express.Router();
// get config vars
dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
const formation = new Formations("formations")
const user = new users("users")
/**
 * Routes to formations
 */
router.get('/', async function (_req, res) {
    await formation.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', helpers.authenticateToken, async function (req, res, next) {
    let body = req.body

    const userInformation: JWTResponse | null = helpers.getUserInformationFromToken(req, res, next)

    if (body.name && body.description && body.location && body.date && body.institute) {
        if (typeof userInformation?.mail === 'string') {
            await user.findByMail(userInformation.mail,async (err: MysqlError | null, result: UsersInterface[]) => {
                if (err) throw res.json(err?.sqlMessage);
                body.user = result[0].id
                await formation.create(body, (err1: MysqlError | null) => {
                    if (err1) throw res.json(err1?.sqlMessage);
                    res.status(200).send({message: 'The formation has been add', code: 200})
                });
            })
        }

    }
})
router.patch('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.description || body.image) {
        await formation.update(body, parseInt(req.params.id), (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The formation has been update', code: 200})
        });
    }
})
router.get('/:id', async function (req, res){
    await formation.find(parseInt(req.params.id), 1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    await formation.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The formation has been delete', code: 200})
    })
})


export default router
