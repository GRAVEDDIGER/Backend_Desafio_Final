import { type Prisma } from '@prisma/client'
import { ProductType } from '../../entities'
export class CreateCartDto implements Prisma.cartsCreateInput {
  constructor (public user: Prisma.UserTypeCreateInput,
    public products: ProductType[]
  ) {}
}
