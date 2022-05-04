import mysql, {queryCallback} from 'mysql'

type DB = {
    host: string,
    user: string,
    password: string,
    database: string
}

export default class DataBase {
    private readonly _configuration: DB;

    constructor(configuration: DB) {
        this._configuration = configuration;
    }

    async query(sql: string, params?: (string | number | undefined)[], result?: queryCallback) {
        const connection = await mysql.createConnection(this._configuration);
        return connection.query(sql, params, result);
    }
}
