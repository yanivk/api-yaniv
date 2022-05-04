import {DatabaseInterface} from "../interfaces/class/databaseInterface";
import {Query, queryCallback} from "mysql";
import DataBase from "../services/db";

import config from '../config';
import Database from "../services/db";
import helper from "../services/helpers";

export default class ModelsClass implements DatabaseInterface {
    readonly _db: DataBase;
    protected table: string;

    constructor(table: string) {
        this._db = new Database(config.db);
        this.table = table
    }

    async find(id: number, page = 1, params?: queryCallback): Promise<Query> {
        const offset = helper.getOffset(page, config.listPerPage);
        return await this._db.query('SELECT * FROM ' + this.table + ' WHERE id = ? LIMIT ?,  ?',[id, offset, config.listPerPage], params);
    }

    async findAll(page = 1, params?: queryCallback): Promise<Query> {
        const offset = helper.getOffset(page, config.listPerPage);
        return await this._db.query('SELECT * FROM ' + this.table + ' LIMIT ?, ?',[ offset, config.listPerPage], params)
    }
}
