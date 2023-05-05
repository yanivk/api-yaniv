import "reflect-metadata"
import { DataSource } from "typeorm"
import * as dotenv from "dotenv";
import {User} from "../entity/user.entity";
import {Blog} from "../entity/blog.entity";
import {Category} from "../entity/category.entity";
import {Formation} from "../entity/formation.entity";
import {Experience} from "../entity/experience.entity";
import {Project} from "../entity/project.entity";
import {Skill} from "../entity/skill.entity";
dotenv.config();

const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.RDS_HOSTNAME || process.env.DB_HOST,
  port: 3306,
  username: process.env.RDS_USERNAME || process.env.DB_USER,
  password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
  database: process.env.RDS_DB_NAME || process.env.DB_DATABASE,
  entities: [User, Blog, Category, Formation, Experience, Project, Skill],
  logging: true,
  synchronize: true,
})
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

export default myDataSource
