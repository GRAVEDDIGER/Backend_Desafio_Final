import { Prisma, CartsType, UserType } from '@prisma/client'
export class CreateSalesDto implements Prisma.salesCreateInput {
  constructor (
    public cart: CartsType,
    public user: UserType,
    public totalWithoutTaxes: number,
    public totalWithTaxes: number
  ) {}
}
