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
}
