import { Prisma, PrismaClient, ModelName } from '@prisma/client'
import { IRequest } from 'passport-fast-config'
import { IResponse } from '..'
import { CreateFunctions } from './functions.service'

type ModelNames = Lowercase<Prisma.ModelName>
type Dto<T extends Lowercase<Prisma.ModelName>> = PrismaClient[T] extends { create: (args: { data: infer U }) => Promise<unknown> } ? U : never

function closure (model: ModelNames, client: PrismaClient) {
  let innerClient: Omit<PrismaClient[typeof model], 'messages'>
  model = 'carts'
  interface CreateFunction {
    [key: string]: (dto: any) => Promise<IResponse>
  }
  // if (model in Prisma.ModelName) {  } else throw new Error('type Missmatch')
  if (model === 'carts') {
    interface CreateFunction {
      create: (dto: Dto<'carts'>) => Promise<IResponse>
    }
    innerClient = new PrismaClient().carts
  }

  const create: CreateFunction = async (dto) => {
    let response: any
    response = await innerClient.create({ data: dto })
  }
}
