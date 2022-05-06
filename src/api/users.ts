import { Request, Response } from 'express'
import * as express from 'express';
import Users from '../models/users'
import jwt, {Secret} from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import bcrypt from "bcrypt";
import { UsersInterface } from "../interfaces/models/usersInterface";
import {MysqlError, Query} from "mysql";

const router = express.Router();
dotenv.config();
type Email = string

type Password = string
function generateAccessToken(mail: Email, password: Password) {
    if (typeof process.env.SECRET_TOKEN === 'string') {
        let secretToken: Secret = process.env.SECRET_TOKEN
        return jwt.sign({mail, password}, secretToken, {expiresIn: '1800s'});
    }
}

const user = new Users("users")

router.get('/login', async function (req: Request, res: Response) {
    const body = req.body;
    await user.findByMail(body.mail, async (err: MysqlError | null, rows: [UsersInterface]) => {
        if (err) throw res.send(err);
        if (rows.length > 0) {
            const validPassword = await bcrypt.compare(body.password, rows[0].password);

            if (validPassword) {
                let newToken = generateAccessToken(rows[0].mail, rows[0].password);
                res.status(200).json({message: "Valid password", token: newToken});
            } else {
                res.status(400).json({error: "Invalid Password"});
            }
        } else {
            res.status(401).json({error: "User does not exist"});
        }
    });

});

router.post('/signup', async function (req, res) {
    const body = req.body
    if (body.firstname && body.lastname && body.mail && body.password) {
        body.token = generateAccessToken(body.mail, body.password);
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        await user.create(body, (err: MysqlError | null, result: Object) =>  {
            if (err) throw err?.sqlMessage;
            res.status(200)
            res.send(result)
        });
    } else {
        res.status(400);
        res.send('One or more parameters is missing');
    }
})

export default router
