import { Prisma, CartsType, UserType } from '@prisma/client'
export class SalesDto implements Prisma.salesCreateInput {
  constructor (
    public cart: CartsType,
    public user: UserType,
    public totalWithoutTaxes: number,
    public totalWithTaxes: number
  ) {}
}
