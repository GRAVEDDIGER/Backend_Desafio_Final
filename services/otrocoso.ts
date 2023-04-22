import { PrismaClient, Prisma, CartsCreateArgs, Carts, ProductsCreateArgs, Products, UsersCreateArgs, Users } from '@prisma/client'
import { CreateCartDto, CreateProductDto, CreateUsersDto } from './dto'

interface ModelsType {
  carts: {
    create: (data: Prisma.CartsCreateArgs['data']) => Promise<Carts>
  }
  products: {
    create: (data: Prisma.ProductsCreateArgs['data']) => Promise<Products>
  }
  users: {
    create: (data: Prisma.UsersCreateArgs['data']) => Promise<Users>
  }
}

async function createMethodFn<T extends CreateCartDto | CreateProductDto | CreateUsersDto> (prisma: PrismaClient, model: keyof ModelsType, dto: T): Promise<unknown> {
  const response = await prisma[model].create({ data: dto }) as unknown// as ModelsType[typeof model]['create'] extends (...args: any) => infer R ? R : never
  return await response
}
