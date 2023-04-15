import {Prisma} from "@prisma/client"
export class CreateProductDto implements Omit<Prisma.ProductsCreateInput,"id"> {
    constructor(
        public name:string,
        public description:string,
        public stock:number,
        public rate:number,
        public price:number, 
        public category:string){}
;
}