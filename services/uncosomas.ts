import { Prisma, PrismaClient, Carts, Products, Users } from '@prisma/client'
import { PrismaClientOptions } from '@prisma/client/runtime'
export interface IParam<T extends Lowercase<Prisma.ModelName>> {
  client: PrismaClient[T]
  data: Dto<T>
  model: T
}
type Dto<T extends Lowercase<Prisma.ModelName>> = PrismaClient[T] extends { create: (args: { data: infer U }) => Promise<unknown> } ? U : never
let dd: Dto<'carts'>
type createMethodType<T extends Lowercase<Prisma.ModelName>> = (dto:Dto<T>)=>Promise<unknown>
const fun1 =(model:Lowercase<Prisma.ModelName>)=>{
    const create:<T extends typeof model>= (client:PrismaClient,dto:Dto<T>):any=>{}
}
const clousure =(model:Lowercase<Prisma.ModelName>)=>{
    const client = new PrismaClient()
    const create:createMethodType<typeof model> =async (dto)=>{
    if (client[model] instanceof client )
        const response = await client[model].create({data:dto})
    }
    return {create}
}
const create:<T extends Lowercase<Prisma.ModelName> = (client:PrismaClient,model:T,dto:Dto<T>): any => {
  const prisma = param.client[param.model]
  return prisma.create({ data: dto }) as any
}
