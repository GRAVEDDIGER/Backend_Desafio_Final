import { Prisma, CartsType, UserType } from '@prisma/client'
export class CreateSalesDto implements Prisma.salesCreateInput {
  constructor (
    public cart: Prisma.cartsCreateNestedOneWithoutSalesInput,
    public user: Prisma.usersCreateNestedOneWithoutSalesInput

  ) {}
}
