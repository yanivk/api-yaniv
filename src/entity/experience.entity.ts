import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from "typeorm"
import {Project} from "./project.entity";
@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  companyName: string

  @Column()
  location: string

  @Column()
  startDate: Date

  @Column()
  endDate: Date

  @Column({ default: false })
  isInProgress: number

  @OneToMany(() => Project, (project) => project.experience)
  projects: Project[]
}
