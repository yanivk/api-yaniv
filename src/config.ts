import * as dotenv from "dotenv";

dotenv.config();
const config =
    {
        db: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            socketPath: process.env.DB_HOST
        },
        listPerPage: 10
    }
export default config
