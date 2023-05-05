import { Request, Response } from 'express'
import * as express from 'express';
import jwt, {Secret} from 'jsonwebtoken';
import * as dotenv from 'dotenv'
import bcrypt from "bcrypt";
import myDataSource from "../services/app-data-source";
import {User} from "../entity/user.entity";
const userRepository = myDataSource.getRepository(User)
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

router.post('/login', async function (req: Request, res: Response) {
    const body = req.body;
    const user = await userRepository.findOneBy({
        mail: body.mail
    })

    if (user) {
        const validPassword = await bcrypt.compare(body.password, user.password);
        if (validPassword) {
            let newToken = generateAccessToken(user.mail, user.password);
            return res.status(200).json({message: "Valid password", token: newToken});
        } else {
            return res.status(400).json({error: "Invalid Password"});
        }
    }
    return res.status(401).json({error: "User does not exist"});

});

router.post('/signup', async function (req, res) {
    const body = req.body
    if (body.firstName && body.lastName && body.mail && body.password) {
        body.token = generateAccessToken(body.mail, body.password);
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        let user = new User()
        user = {...body}
        await userRepository.save(user)
        return res.status(200).send("work")
    } else {
        res.status(400);
        return res.send('One or more parameters is missing');
    }
})

export default router
