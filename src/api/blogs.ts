import * as express from 'express';
import * as dotenv from 'dotenv'
import {MysqlError} from "mysql";
import helpers from '../services/helpers';
import Blogs from "../models/blogs";
import {UsersInterface} from "../interfaces/models/usersInterface";
import users from "../models/users";

const router = express.Router();
// get config vars
dotenv.config();

type JWTResponse = {
    mail: string
    password: string
    iat: number
    exp: number

}
const blog = new Blogs("blogs")
const user = new users("users")
/**
 * Routes to Blogs
 */
router.get('/', async function (_req, res) {
    await blog.findAll(1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.post('/add', helpers.authenticateToken, async function (req, res, next) {
    let body = req.body

    const userInformation: JWTResponse | null = helpers.getUserInformationFromToken(req, res, next)

    if (body.name && body.content && body.slug) {
        if (typeof userInformation?.mail === 'string') {
            await user.findByMail(userInformation.mail,async (err: MysqlError | null, result: UsersInterface[]) => {
                if (err) throw res.json(err?.sqlMessage);
                body.user = result[0].id
                await blog.create(body, (err1: MysqlError | null, results) => {
                    if (err1) throw res.json(err1?.sqlMessage);
                    // Check if content of categories in body is with name or description, or if category exist and push with id
                    if (body.categories.name || body.categories.description) {
                        blog.categoriesCreation(body, results.insertId)
                    } else {
                        blog.categoriesCreation(body, results.insertId, true)
                    }
                    res.status(200).send({message: 'The blog has been add', code: 200})
                });
            })
        }
    } else {
        res.status(400).send({message: 'You don\'t have all input in your request'})
    }

})

router.post('/:bid/categories/:cid', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.blog_id && body.category_id) {
        await blog.setBlogCategoryExist({
            blogId: parseInt(req.params.bid),
            categoryId: parseInt(req.params.cid)
        }, {
            blogId: body.blog_id,
            categoryId: body.category_id
        }, (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage)
            res.status(200).send({message: 'The blog category has been update'})
        })
    }
})

router.patch('/:id', helpers.authenticateToken, async function (req, res) {
    const body = req.body
    if (body.name || body.image) {
        await blog.update(body, parseInt(req.params.id), (err: MysqlError | null) => {
            if (err) throw res.json(err?.sqlMessage);
            res.status(200).send({message: 'The blog has been update', code: 200})
        });
    }
})

router.get('/:id', async function (req, res){
    await blog.find(parseInt(req.params.id), 1, (err: MysqlError | null, result: Object) => {
        if (err) throw res.json(err?.sqlMessage);
        res.send(result)
    })
})
router.delete('/:id', helpers.authenticateToken, async function (req, res){
    await blog.remove(parseInt(req.params.id), (err: MysqlError | null) => {
        if (err) throw res.json(err?.sqlMessage);
        res.status(200).send({message: 'The blog has been delete', code: 200})
    })
})


export default router
