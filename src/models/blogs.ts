import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";
import {BlogsInterface} from "../interfaces/models/blogsInterface";

export default class Blogs extends ModelsClass {
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


}
