import mysql, {queryCallback} from 'mysql'

type IDatabase = {
    host: string | undefined,
    user: string | undefined,
    password: string | undefined,
    database: string | undefined
}

export default class DataBase {
    private readonly _configuration: IDatabase;

    constructor(configuration: IDatabase) {
        this._configuration = configuration;
    }

    async query(sql: string, params?: (string | number | undefined)[], result?: queryCallback) {
        const connection = mysql.createConnection(this._configuration);
        return connection.query(sql, params, result);
    }
}
