import * as express from 'express';
import helpers from '../services/helpers';
import myDataSource from "../services/app-data-source";
import {Category} from "../entity/category.entity";
const categoryRepository = myDataSource.getRepository(Category)

const router = express.Router();

/**
 * Routes to Categories
 */
router.get('/', async function (_req, res) {
    const categories = await categoryRepository.find();
    res.send(categories)
})
router.post('/', helpers.authenticateToken, async function (req, res, next) {
    const body = req.body
    const category = categoryRepository.create(body)
    const results = await categoryRepository.save(category)
    return res.send(results)
})
router.put('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        const category = await categoryRepository.findOneBy({id: parseInt(req.params.id)})
        if (category instanceof Category) {
            await categoryRepository.merge(category, body)
            const results = await categoryRepository.save(category)
            res.send(results)
        }
    }
})
router.get('/:id', async function (req, res){
    const result = await categoryRepository.findOneBy({id: parseInt(req.params.id)})
    res.send(result)
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    const result = await categoryRepository.delete(parseInt(req.params.id))
    res.send(result)
})


export default router
