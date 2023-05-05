import { Entity, Column, PrimaryGeneratedColumn,ManyToOne } from "typeorm"
import {User} from "./user.entity";
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne (() => User, (user) => user.blogs)
  users: User
}
