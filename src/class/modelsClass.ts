import {DatabaseInterface} from "../interfaces/class/databaseInterface";
import {Query, queryCallback} from "mysql";
import DataBase from "../services/DataBase";
import config from '../config';
import helper from "../services/helpers";

export default class ModelsClass implements DatabaseInterface {
    readonly _db: DataBase;
    protected table: string;

    constructor(table: string) {
        this._db = new DataBase(config.db);
        this.table = table
    }

    find(id: number, page = 1, params?: queryCallback): Promise<Query> {
        const offset = helper.getOffset(page, config.listPerPage);
        return this._db.query('SELECT * FROM ' + this.table + ' WHERE id = ? LIMIT ?,  ?',[id, offset, config.listPerPage], params);
    }

    findAll(page = 1, params?: queryCallback): Promise<Query> {
        const offset = helper.getOffset(page, config.listPerPage);
        return this._db.query('SELECT * FROM ' + this.table + ' LIMIT ?, ?',[offset, config.listPerPage], params);
    }

    remove(id: number, params?: queryCallback): Promise<Query> {
        return this._db.query('DELETE FROM ' + this.table + ' WHERE id = ?', [id], params)
    }

    /**
     * This function can be updating a simple entity with no complex database relationship (One To One | One To Many)
     * If you have a complex relation (Many To Many) you should rewrite a function more specific in a model of object
     */
    update(objectValue: object, id: number, param?: queryCallback) {
        let query = 'UPDATE '+ this.table + ' SET '
        let parameters: any[] = []
        Object.keys(objectValue).forEach((value, index, array) => {
            if (array.length - 1 === index){
                query += `${value} = ? `
            } else {
                query += `${value} = ?,`
            }
            // @ts-ignore
            parameters = [...parameters, objectValue[value]]
        })
        query += 'WHERE id = ?'
        console.log(parameters)
        return this._db.query(
            query,
            [...parameters, id],
            param
        );
    }
}
