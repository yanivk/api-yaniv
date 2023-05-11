import * as express from 'express';
import helpers from '../services/helpers';
import myDataSource from "../services/app-data-source";
import {Blog} from "../entity/blog.entity";
const blogRepository = myDataSource.getRepository(Blog)

const router = express.Router();


/**
 * Routes to Blogs
 */
router.get('/', async function (_req, res) {
    const blogs = await blogRepository.find({
        relations: ['categories']
    });
    res.send(blogs)
})

router.post('/', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    const blog = blogRepository.create(body)
    const results = await blogRepository.save(blog)
    return res.send(results)
})


router.put('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        const blog = await blogRepository.findOneBy({id: parseInt(req.params.id)})
        if (blog instanceof Blog) {
            await blogRepository.merge(blog, body)
            const results = await blogRepository.save(blog)
            res.send(results)
        }
    }
})
router.get('/:id', async function (req, res){
    const result = await blogRepository.findOne({
    where: { id: parseInt(req.params.id) },
    relations: ['categories']
})
    res.send(result)
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    const result = await blogRepository.delete(parseInt(req.params.id))
    res.send(result)
})

export default router
