import { Request, Response } from 'express'
import * as express from 'express'

const router = express.Router();

/* GET home page. */
router.get('/', function(_req: Request, res: Response, next) {
    try {
        return res.send('coucou')
    } catch (e) {
        next(e);
    }
});

router.get('/', function(_req: Request, res: Response, next) {
    try {
        return res.send('coucou')
    } catch (err) {
        next(err);
    }
});

export default router
