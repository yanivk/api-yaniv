import { NextFunction, Request, Response } from 'express'
import * as express from 'express';
import * as dotenv from 'dotenv'
import jwt, {Secret} from 'jsonwebtoken';
import projects from "../models/projects";

const router = express.Router();
// get config vars
dotenv.config();


const project = new projects('project')

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
router.get('/', authenticateToken, async function (req, res, next) {
    await project.findAll(1, function (err: Object, result: Object) {
        if (err) throw err;
        res.send(result)
    }).then(r => console.log(r));
})
router.post('/add', authenticateToken, async function (req, res, next) {
    const body = req.body
    if (body.name && body.description && body.image) {
        await project.create(body, function (err: string, result: object) {
            if (err) throw res.json(err);
            res.status(200)
            res.send(result)
        });
    }
})
router.get('/:id', authenticateToken, function (req, res,next){
    project.find(parseInt(req.params.id), 1, function (err: Object, result: Object) {
        if (err) throw err;
        return res.send(result)
    }).then(r => console.log(r));
})
router.delete('/:id', authenticateToken, function (req, res,next){
    res.json('DELETE book')
})


export default router
