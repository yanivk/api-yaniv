import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm"
import {Blog} from "./blog.entity";
import {Formation} from "./formation.entity";
import {Project} from "./project.entity";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  mail: string

  @Column()
  password: string

  @Column()
  token: string

  @OneToMany(() => Blog, (blog) => blog.user)
  blogs: Blog[]

  @OneToMany(() => Formation, (formation) => formation.user)
  formations: Formation[]

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[]
}
