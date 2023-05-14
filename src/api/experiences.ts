import * as express from 'express';
import helpers from '../services/helpers';
import {Experience} from "../entity/experience.entity";
import myDataSource from "../services/app-data-source";
const experienceRepository = myDataSource.getRepository(Experience)

const router = express.Router();

/**
 * Routes to Experiences
 */
router.get('/', async function (_req, res) {
    const experiences = await experienceRepository.find({
        relations: ['projects']
    });
    res.send(experiences)
})
router.post('/', helpers.authenticateToken, async function (req, res, next) {
    const body = req.body
    const experience = experienceRepository.create(body)
    const results = await experienceRepository.save(experience)
    return res.send(results)
})
router.put('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        const experience = await experienceRepository.findOneBy({id: parseInt(req.params.id)})
        if (experience instanceof Experience) {
            await experienceRepository.merge(experience, body)
            const results = await experienceRepository.save(experience)
            res.send(results)
        }
    }
})
router.get('/:id', async function (req, res){
    const result = await experienceRepository.findOne({
        where: {
            id: parseInt(req.params.id)
        },
        relations: ['projects']
    })
    res.send(result)
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    const result = await experienceRepository.delete(parseInt(req.params.id))
    res.send(result)
})

export default router
