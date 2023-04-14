import {Prisma} from "@prisma/client"
export class ProductDto implements Omit<Prisma.ProductsCreateInput,"id"> {
    name!: string;
    description!: string;
    stock!: number;
    rate!: number;
    price!: number;
}