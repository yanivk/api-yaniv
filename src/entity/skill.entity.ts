import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm"
import {Project} from "./project.entity";
import {Formation} from "./formation.entity";
@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  image: string

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[]

  @ManyToMany(() => Formation)
  @JoinTable()
  formations: Formation[]
}
