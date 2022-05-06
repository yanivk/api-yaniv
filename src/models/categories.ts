import ModelsClass from "../class/modelsClass";
import {queryCallback} from "mysql";
import {CategoriesInterface} from "../interfaces/models/categoriesInterface";

export default class Categories extends ModelsClass {
    constructor(table: string) {
        super(table)
    }

    create(category: CategoriesInterface, param?: queryCallback) {
        return this._db.query(
            'INSERT INTO categories (name, description) VALUES (?,?)',
            [category.name, category.description],
            param
        );
    }
}
