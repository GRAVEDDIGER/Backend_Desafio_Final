import { Prisma, PrismaClient, Carts, Products, Users } from '@prisma/client'
import { CreateCartDto, CreateProductDto, CreateUsersDto } from '../entities/'

interface ModelsType {
  carts: {
    create: (data: Prisma.CartsCreateArgs['data']) => any
  }
  products: {
    create: (data: Prisma.ProductsCreateArgs['data']) => any
  }
  users: {
    create: (data: Prisma.UsersCreateArgs['data']) => any
  }
}
type dada = Prisma.CartsCreateArgs['data']
let ddd: dada

export async function createMethodFn<T extends CreateCartDto | CreateProductDto | CreateUsersDto> (prisma: PrismaClient, model: keyof ModelsType, dto: T): Promise<unknown> {
  const response = await prisma[model].create({ data: dto }) as unknown as ModelsType[typeof model]['create'] extends (...args: any) => infer R ? R : never
  return response
}
