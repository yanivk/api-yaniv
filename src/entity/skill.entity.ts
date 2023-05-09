import {Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable} from "typeorm"
import {Project} from "./project.entity";
import {Formation} from "./formation.entity";
@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({
    nullable: true,
  })
  image: string

  @ManyToMany(() => Project)
  @JoinTable({name: "skills_projects"})
  projects: Project[]

  @ManyToMany(() => Formation)
  @JoinTable({name: "skills_formations"})
  formations: Formation[]
}
