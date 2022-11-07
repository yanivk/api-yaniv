import mysql, {queryCallback} from 'mysql'

type IDatabase = {
    host: string | undefined,
    user: string | undefined,
    password: string | undefined,
    database: string | undefined,
    socketPath: string | undefined
}

export default class DataBase {
    private readonly _configuration: IDatabase;

    constructor(configuration: IDatabase) {
        this._configuration = configuration;
    }

    async query(sql: string, params?: (string | number | Date | boolean | undefined)[], result?: queryCallback) {
        if (process.env.NODE_ENV === 'production') {
            this._configuration.socketPath = `/cloudsql/${process.env.DB_INSTANCE_CONNECTION_NAME}`
        } else {
            this._configuration.socketPath = undefined
        }
        const connection = mysql.createConnection(this._configuration);

        return connection.query(sql, params, result);
    }
}
