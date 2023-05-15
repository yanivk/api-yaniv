import * as express from 'express';
import helpers from '../services/helpers';
import myDataSource from "../services/app-data-source";
import {Formation} from "../entity/formation.entity";
const formationRepository = myDataSource.getRepository(Formation)

const router = express.Router();

/**
 * Routes to formations
 */
router.get('/', async function (_req, res) {
    const formations = await formationRepository.find({
        relations: ['user']
    });
    res.send(formations)
})

router.post('/', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    const formation = formationRepository.create(body)
    const results = await formationRepository.save(formation)
    return res.send(results)
})


router.put('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        const formation = await formationRepository.findOneBy({id: parseInt(req.params.id)})
        if (formation instanceof Formation) {
            await formationRepository.merge(formation, body)
            const results = await formationRepository.save(formation)
            res.send(results)
        }
    }
})
router.get('/:id', async function (req, res){
    const result = await formationRepository.findOne({
        where: { id: parseInt(req.params.id) },
        relations: ['user']
    })
    res.send(result)
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    const result = await formationRepository.delete(parseInt(req.params.id))
    res.send(result)
})

export default router
