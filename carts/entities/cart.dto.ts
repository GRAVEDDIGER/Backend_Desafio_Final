import { Prisma } from "@prisma/client";
import {CreateUsersDto} from "../../users/entities"
export class CreateCartDto implements Prisma.CartsCreateInput {
    constructor(public user:Prisma.UsersCreateNestedOneWithoutCartsInput,
                public products?:Prisma.ProductsCreateNestedManyWithoutCartsInput){}
}