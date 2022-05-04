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
type Email = {
    mail: string
}

type Password = {
    password: string
}
function generateAccessToken(mail: Email, password: Password) {
    if (typeof process.env.SECRET_TOKEN === 'string') {
        let secretToken: Secret = process.env.SECRET_TOKEN
        return jwt.sign({mail, password}, secretToken, {expiresIn: '1800s'});
    }
}

const user = new Users()

router.get('/login', async function (req: Request, res: Response) {
    const body = req.body;
    const userFound: Query = await user.findByMail(body.mail, async (err: MysqlError | null, rows: [UsersInterface]) => {
        if (err) throw await res.send(err);
        console.log(userFound)
        if (rows.length > 0) {
            const validPassword = await bcrypt.compare(body.password, rows[0].password);

            if (validPassword) {
                let newToken = generateAccessToken({mail: rows[0].mail}, {password: rows[0].password});
                //await userFound.setToken(rows[0].id, newToken);
                await res.status(200).json({message: "Valid password", token: newToken});
            } else {
                await res.status(400).json({error: "Invalid Password"});
            }
        } else {
            await res.status(401).json({error: "User does not exist"});
        }
    });

});

router.post('/signup', async function (req, res) {
    const body = req.body
    if (body.firstname && body.lastname && body.mail && body.password) {
        body.token = generateAccessToken({mail: body.mail}, {password: body.password});
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
