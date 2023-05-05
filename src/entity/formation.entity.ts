import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import {User} from "./user.entity";

@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @Column()
  location: string

  @Column()
  date: Date

  @Column()
  degree: string

  @Column()
  institute: string

  @ManyToOne(() => User, (user) => user.formations)
  user: User
}
