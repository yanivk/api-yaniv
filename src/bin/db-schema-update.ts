import DataBase from "../services/db";
import config from "../config";
import * as fs from "fs";
import * as path from "path";
import {MysqlError} from "mysql";

const dirModels = "./src/interfaces/models"
const filesInModels = fs.readdirSync(dirModels)

class DbSchemaUpdate {
    readonly _db: DataBase;
    constructor() {
        this._db = new DataBase(config.db);
    }
    public schemaUpdate (table: string) {
        this._db.query(`CREATE TABLE IF NOT EXISTS ${table} (id int, PRIMARY KEY (id))`, [], (err: MysqlError | null, result: Object) =>  {
            if (err) throw err;
        }).catch((r) => console.log(r, 'background: #E94F37; color: #393E41'))
    }
}

const dbSchema = new DbSchemaUpdate()
let upper = [];
filesInModels.forEach((file) => {
    if (file.includes('.ts')){
/*        if (file.match(/[A-Z]/)) {
            //console.log('Contains uppercase');
            //Permit to find uppercase and list in array. Need to transform uppercase per lowercase and add _
            //file = file.replace(/[a-z]/g, '');
            //upper = file.split('');
        }

        let content = fs.readFileSync(path.join(dirModels, file), 'utf-8')
        content = content.replace(/^import.+";$/gm, '')
        content = content.replace(/^export interface .+Interface/gm, '')
        content = content.replace(/(?:\r\n|\r|\n)/g, '')
        content = content.replace(/    /g, '", ')
        content = content.replace(/,,/g, ' , ')
        content = content.replace(/ /g, '"')
        content = content.replace(/"{",/g, '{')
        content = content.replace(/}/g, '"}')
        const contentTransformed = JSON.parse(JSON.stringify(content))
        console.log(typeof contentTransformed)*/
        file = file.replace('Interface.ts', '')
        dbSchema.schemaUpdate(file)
    }
})
