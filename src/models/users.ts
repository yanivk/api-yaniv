import Database from '../services/db'
import helper from '../services/helpers';
import config from '../config';
import { UsersInterface } from "../interfaces/models/usersInterface";
import {DatabaseInterface} from "../interfaces/class/databaseInterface";
import {Query} from "mysql";

export default class Users implements DatabaseInterface{
    readonly _db: Database;

    constructor() {
        this._db = new Database(config.db);
    }

    async findAll(page: number = 1, params?: Function) {
        const offset = helper.getOffset(page, config.listPerPage);
        return await this._db.query(`SELECT name
                               FROM users LIMIT ${offset}, ${config.listPerPage}`, params)
    }


    async find(id: number, page: number = 1, params?: Function) {
        const offset = helper.getOffset(page, config.listPerPage);
        return await this._db.query(`SELECT name
                               FROM users
                               WHERE id = ${id} LIMIT ${offset}
                                   , ${config.listPerPage}`, params);
    }


    async findByMail(mail: string, param?: Function) {
        return await this._db.query(`SELECT *
                               FROM users
                               WHERE mail = "${mail}"`, param);
    }


    async create(users: UsersInterface, param?: Function): Promise<Query> {
        return await this._db.query(`INSERT INTO users (firstname, lastname, mail, password, token)
                               VALUES ('${users.firstname}', '${users.lastname}', '${users.mail}', '${users.password}',
                                       '${users.token}')`, param);
    }


    async setToken(id: number, token: string, param?: Function) {
        return await this._db.query(`UPDATE users
                               SET token = "${token}"
                               WHERE id = ${id}`, param);
    }
}
