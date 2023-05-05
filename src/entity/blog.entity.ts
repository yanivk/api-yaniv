import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToOne, ManyToMany } from "typeorm"
import {User} from "./user.entity";
import {Category} from "./category.entity";
@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  content: string

  @Column()
  slug: string

  @Column()
  image: string

  @ManyToOne (() => User, (user) => user.blogs)
  user: User

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]
}
