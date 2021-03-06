import * as express from 'express';
import * as dotenv from 'dotenv'
import {MysqlError} from "mysql";
import helpers from '../services/helpers';
import Categories from "../models/categories";

const router = express.Router();
// get config vars
dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
const category = new Categories("categories")
/**
 * Routes to Categories
 */
router.get('/', async function (_req, res) {
    await category.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', helpers.authenticateToken, async function (req, res, next) {
    let body = req.body

    await category.create(body, (err1: MysqlError | null) => {
        if (err1) throw res.json(err1?.sqlMessage);
        res.status(200).send({message: 'The category has been add', code: 200})
    });

})
router.patch('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        await category.update(body, parseInt(req.params.id), (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The category has been update', code: 200})
        });
    }
})
router.get('/:id', async function (req, res){
    await category.find(parseInt(req.params.id), 1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    await category.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The category has been delete', code: 200})
    })
})


export default router
