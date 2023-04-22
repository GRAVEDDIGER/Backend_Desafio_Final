import { Prisma, PrismaClient } from '@prisma/client'
import { CreateUsersDto } from '../entities'
export interface IParam<T extends Lowercase<Prisma.ModelName>> {
  client: PrismaClient[T]
  data: Dto<T>
  model: T
}

type Dto<T extends Lowercase<Prisma.ModelName>> = PrismaClient[T] extends { create: (args: { data: infer U }) => Promise<unknown> } ? U : never
type ModelNames = Prisma.ModelName
type functionType<T extends ModelNames> = (dto: Dto<T>, model: T, client: PrismaClient) => Promise<any>

export function CreateFunctions (): any {
  const createCarts: functionType<'carts'> = async (dto, model, client): Promise<any> => {
    let response
    if (model === 'carts') {
      response = await client[model].create({ data: dto })
      return response
    } else throw new Error('Type missmatch')
  }

  const createUsers: functionType<'users'> = async (dto, model, client): Promise<any> => {
    let response
    if (model === 'users') {
      response = await client[model].create({ data: dto })
      return response
    } else throw new Error('Type missmatch')
  }

  return { createCarts, createUsers }
}
