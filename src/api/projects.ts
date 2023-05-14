import * as express from 'express';
import helpers from '../services/helpers';
import myDataSource from "../services/app-data-source";
import {Project} from "../entity/project.entity";
const projectRepository = myDataSource.getRepository(Project)

const router = express.Router();

/**
 * Routes to projects
 */
router.get('/', async function (_req, res) {
    const projects = await projectRepository.find({
        relations: ['experience']
    });
    res.send(projects)
})
router.post('/', helpers.authenticateToken, async function (req, res, next) {
    const body = req.body
    const project = projectRepository.create(body)
    const results = await projectRepository.save(project)
    return res.send(results)
})
router.put('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        const project = await projectRepository.findOneBy({id: parseInt(req.params.id)})
        if (project instanceof Project) {
            await projectRepository.merge(project, body)
            const results = await projectRepository.save(project)
            res.send(results)
        }
    }
})
router.get('/:id', async function (req, res){
    const result = await projectRepository.findOne({
    where: {
        id: parseInt(req.params.id)
    },
    relations: ['experience']
})
    res.send(result)
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    const result = await projectRepository.delete(parseInt(req.params.id))
    res.send(result)
})


export default router
