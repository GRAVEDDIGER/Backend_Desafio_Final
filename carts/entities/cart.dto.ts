import { type Prisma } from '@prisma/client'
import { ProductType, UserType } from '../../entities'
export class CreateCartDto implements Prisma.CartsCreateInput {
  constructor (public user: UserType,
    public products: ProductType[]
  ) {}
}
