import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn} from "typeorm"
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

  @CreateDateColumn()
  created_at: Date

  @Column({
    nullable: true,
  })
  image: string

  @ManyToOne(() => User, (user) => user.projects)
  user: User

  @ManyToOne(() => Experience, (experience) => experience.projects)
  experience: Experience
}
