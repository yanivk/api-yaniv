import mysql, {queryCallback} from 'mysql'

type DB = {
    host: string | undefined,
    user: string | undefined,
    password: string | undefined,
    database: string | undefined
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
