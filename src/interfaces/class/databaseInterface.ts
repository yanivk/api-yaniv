import Database from "../../services/DataBase";
import {Query} from "mysql";

export interface DatabaseInterface {
    readonly _db: Database;
    findAll(page?:number, params?: Function): Promise<Query>
    find(id: number, page?: number, params?: Function ): Promise<Query>
}
