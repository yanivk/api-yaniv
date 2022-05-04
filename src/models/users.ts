import Database from '../services/DataBase'
import helper from '../services/helpers';
import config from '../config';
import { UsersInterface } from "../interfaces/models/usersInterface";
import {DatabaseInterface} from "../interfaces/class/databaseInterface";
import {Query, queryCallback} from "mysql";

export default class Users implements DatabaseInterface{
    readonly _db: Database;

    constructor() {
        this._db = new Database(config.db);
    }

    findAll(page: number = 1, params?: queryCallback) {
        const offset = helper.getOffset(page, config.listPerPage);
        return this._db.query('SELECT firstname FROM users LIMIT ?, ?', [offset, config.listPerPage], params)
    }


    find(id: number, page: number = 1, params?: queryCallback) {
        const offset = helper.getOffset(page, config.listPerPage);
        return this._db.query('SELECT firstname FROM users WHERE id = ? LIMIT ?, ?', [id, offset, config.listPerPage], params);
    }


    findByMail(mail: string, param?: queryCallback) {
        return this._db.query('SELECT * FROM users WHERE mail = ?', [mail], param);
    }


    create(users: UsersInterface, param?: queryCallback): Promise<Query> {
        return this._db.query('INSERT INTO users (firstname, lastname, mail, password, token) VALUES (?,?,?,?,?)', [users.firstname, users.lastname, users.mail, users.password, users.token], param);
    }


    setToken(id: number, token: string, param?: queryCallback) {
        return this._db.query('UPDATE users SET token = ? WHERE id = ?', [token, id], param);
    }
}
