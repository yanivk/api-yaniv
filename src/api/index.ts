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

/*Health route*/
router.get('/health-check', function (req, res) {
  return res.send('Health check good');
});

export default router
