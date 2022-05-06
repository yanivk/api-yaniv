import {NextFunction, Request, Response} from "express";
import jwt, {JwtPayload, Secret} from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
export default class Helpers {

    emptyOrRows(rows: Object) {
        if (!rows) {
            return [];
        }
        return rows;
    }

    static getOffset(currentPage: number, listPerPage: number) {
        return (currentPage - 1) * listPerPage;
    }

    static formatDate(date: Date): string {
        return [
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        ].join('/');
    }

    static authenticateToken(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return res.sendStatus(401)

        if (typeof process.env.SECRET_TOKEN === 'string') {
            let secretToken: Secret = process.env.SECRET_TOKEN

            jwt.verify(token, secretToken, (err) => {
                if (err) return res.status(403).json('Your token is not good')
                next()
            })
        }
    }

    static getUserInformationFromToken(req: Request, _res: Response, _next: NextFunction):  JWTResponse | null {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        if (token == null) return null

        return JSON.parse(JSON.stringify(jwt.decode(token)))
    }
}
