import { NextFunction, Request, Response } from 'express'
import * as express from 'express';
import * as dotenv from 'dotenv'
import jwt, {Secret} from 'jsonwebtoken';
import projects from "../models/projects";
import {MysqlError} from "mysql";

const router = express.Router();
// get config vars
dotenv.config();


const project = new projects("projects")

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    if (typeof process.env.SECRET_TOKEN === 'string') {
        let secretToken: Secret = process.env.SECRET_TOKEN

        jwt.verify(token, secretToken , (err) => {
            if (err) return res.status(403).json('Your token is not good')
            next()
        })
    }
}

/**
 * Routes to projects
 */
router.get('/', async function (_req, res) {
    await project.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name && body.description && body.image) {
        await project.create(body, (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The project has been add', code: 200})
        });
    }
})
router.patch('/:id', authenticateToken, async function (req, res) {
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
router.delete('/:id', authenticateToken, async function (req, res){
    await project.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The project has been delete', code: 200})
    })
})


export default router
