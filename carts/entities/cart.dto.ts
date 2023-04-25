import { type Prisma } from '@prisma/client'
import { ProductType, UserType } from '../../entities'
export class CreateCartDto implements Prisma.cartsCreateInput {
  constructor (public user: UserType,
    public products: ProductType[]
  ) {}
}
