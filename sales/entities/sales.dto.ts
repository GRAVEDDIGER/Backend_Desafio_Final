import { Prisma } from '@prisma/client'
export class CreateSalesDto implements Prisma.salesCreateInput {
  constructor (
    public cart: Prisma.cartsCreateNestedOneWithoutSalesInput,
    public user: Prisma.usersCreateNestedOneWithoutSalesInput

  ) {}
}
