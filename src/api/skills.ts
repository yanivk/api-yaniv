import * as express from 'express';
import helpers from '../services/helpers';
import myDataSource from "../services/app-data-source";
import {Skill} from "../entity/skill.entity";
const skillRepository = myDataSource.getRepository(Skill)

const router = express.Router();

/**
 * Routes to Skills
 */
router.get('/', async function (_req, res) {
    const skills = await skillRepository.find();
    res.send(skills)
})
router.post('/', helpers.authenticateToken, async function (req, res, next) {
    const body = req.body
    const skill = skillRepository.create(body)
    const results = await skillRepository.save(skill)
    return res.send(results)
})
router.put('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        const skill = await skillRepository.findOneBy({id: parseInt(req.params.id)})
        if (skill instanceof Skill) {
            await skillRepository.merge(skill, body)
            const results = await skillRepository.save(skill)
            res.send(results)
        }
    }
})
router.get('/:id', async function (req, res){
    const result = await skillRepository.findOneBy({id: parseInt(req.params.id)})
    res.send(result)
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    const result = await skillRepository.delete(parseInt(req.params.id))
    res.send(result)
})

export default router
