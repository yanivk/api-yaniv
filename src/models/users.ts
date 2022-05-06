import {Query, queryCallback} from "mysql";
import ModelsClass from "../class/modelsClass";
import {UsersInterface} from "../interfaces/models/usersInterface";

export default class Users extends ModelsClass{
    constructor(table: string) {
        super(table)
    }

    findByMail(mail: string, param?: queryCallback): Promise<Query> {
        return this._db.query('SELECT * FROM users WHERE mail = ?', [mail], param);
    }

    create(users: UsersInterface, param?: queryCallback): Promise<Query> {
        return this._db.query('INSERT INTO users (firstname, lastname, mail, password, token) VALUES (?,?,?,?,?)', [users.firstname, users.lastname, users.mail, users.password, users.token], param);
    }


    setToken(id: number, token: string, param?: queryCallback): Promise<Query> {
        return this._db.query('UPDATE users SET token = ? WHERE id = ?', [token, id], param);
    }
}
