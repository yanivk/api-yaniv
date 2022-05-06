import ModelsClass from "../class/modelsClass";
import {OkPacket, Query, queryCallback} from "mysql";
import {BlogsInterface} from "../interfaces/models/blogsInterface";
import Categories from "./categories";

const category = new Categories("categories")

export default class Blogs extends ModelsClass {
    private categories: (number | Promise<Query> | void)[] | undefined

    constructor(table: string) {
        super(table)
    }

    create(blog: BlogsInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO blogs (name, content, slug, image) VALUES (?,?,?,?)',
            [blog.name, blog.content, blog.slug, blog.image],
            param
        );
    }

    categoriesCreation(blog: BlogsInterface, blogId: number, isCategoryExist: boolean = false) {
        if (blog.categories) {
            if (isCategoryExist) {
                blog.categories.forEach(async (value, _key) => {
                    await this.setBlogCategory(blogId, value.id)
                })
            } else {
                blog.categories.forEach(async (value, _key) => {
                    await category.create(value, (err, results) => {
                        if (err) throw err
                        this._db.query(
                            'INSERT INTO blogs_categories (blog_id, category_id) VALUES(?,?)',
                            [blogId, results.insertId]
                        )
                    })
                })
            }

        }
    }

    private async setBlogCategory(blogId: number, categoryId: number) {
        await this._db.query(
            'INSERT INTO blogs_categories (blog_id, category_id) VALUES (?,?)',
            [blogId, categoryId]
        )
    }

}
