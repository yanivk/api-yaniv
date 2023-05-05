import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {User} from "./user.entity";
import {Experience} from "./experience.entity";

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  createdAt: Date

  @Column()
  image: string

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @ManyToOne(() => Experience, (experience) => experience.projects)
  experience: Experience
}
