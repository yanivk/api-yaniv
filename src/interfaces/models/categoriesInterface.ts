import {BlogsInterface} from "./blogsInterface";

export interface CategoriesInterface {
    id: number
    name: string
    description?: string
    blogs?: BlogsInterface[]
}
