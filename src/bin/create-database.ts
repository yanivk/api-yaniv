import DataBase from "../services/DataBase";
import config from "../config";

class CreateDatabase {
    readonly _db: DataBase;
    constructor() {
        this._db = new DataBase(config.db);
    }
    public create () {
        this._db.query(`CREATE DATABASE IF NOT EXISTS  ${config.db.database}`)
            .then((query) => query.values === undefined ? console.log('The database already exist') : console.log('The database has been created'))
            .catch((e) => console.log(e))
    }
}

new CreateDatabase().create()
