import * as express from 'express';
import * as dotenv from 'dotenv'
import {MysqlError} from "mysql";
import helpers from '../services/helpers';
import Skills from '../models/skills';

const router = express.Router();
// get config vars
dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
const skill = new Skills("skills")
/**
 * Routes to Skills
 */
router.get('/', async function (_req, res) {
    await skill.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', helpers.authenticateToken, async function (req, res, next) {
    let body = req.body
    const file = req.files
    if (file){
        let imageFiles = file.image
        if ("mv" in imageFiles) {
            await imageFiles.mv('./public/uploads/' + imageFiles.name);
            body.image = imageFiles.name
        }
    }
    await skill.create(body, (err1: MysqlError | null) => {
        if (err1) throw res.json(err1?.sqlMessage);
        res.status(200).send({message: 'The skill has been add', code: 200})
    });

})
router.patch('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    const file = req.files
    if (file){
        let imageFiles = file.image
        if ("mv" in imageFiles) {
            await imageFiles.mv('./public/uploads/skills/' + imageFiles.name);
            body.image = imageFiles.name
        }
    }
    if (body.name || body.image) {

        await skill.update(body, parseInt(req.params.id), (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The skill has been update', code: 200})
        });
    }
})
router.get('/:id', async function (req, res){
    await skill.find(parseInt(req.params.id), 1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    await skill.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The skill has been delete', code: 200})
    })
})


export default router
