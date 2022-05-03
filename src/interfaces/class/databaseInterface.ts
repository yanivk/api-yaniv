import Database from "../../services/db";
import {Query} from "mysql";

export interface DatabaseInterface {
    readonly _db: Database;
    findAll(page?:number, params?: Function): Promise<Query>
    find(id: number, page?: number, params?: Function ): Promise<Query>
}
