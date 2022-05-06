import {CategoriesInterface} from "./categoriesInterface";

export interface BlogsInterface {
    id: number
    name: string
    content: string
    slug: string
    image?: string
    categories?: CategoriesInterface[]
}
