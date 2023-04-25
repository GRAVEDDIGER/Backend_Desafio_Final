import { PrismaClient, Prisma } from '@prisma/client'
import { CreateUsersDto } from '../entities'
type Dto<T extends Lowercase<Prisma.ModelName>> = PrismaClient[T] extends { create: (args: { data: infer U }) => Promise<unknown> } ? U : never

type DtoType = {
  [P in Prisma.ModelName]: Dto<P>
}
export class PrismaSingleton {
  static Instance: any
  constructor (
    public prisma = new PrismaClient().$extends({
      model: {
        $allModels: {
          async createGeneric<T>(
            this: T & { create: Function },
            x: Prisma.Args<T, 'create' >
          ): Promise<any> {
            const response = await this.create({ ...x })
            console.log(response)

            return response
          },
          async updateGeneric<T>(
            this: T & { update: Function },
            data: Prisma.Args<T, 'update'>,
            id: string
          ) {
            const response = await this.update({ where: { id }, data })
            return response
          },
          async deleteGeneric<T>(
            this: T & { delete: Function },
            id: string
          ) {
            const response = await this.delete({ where: { id } })
            return response
          },
          async listGeneric <T>(
            this: T & { findMany: Function }
          ) {
            const response = await this.findMany()
            return response
          },
          async getByIdGeneric <T>(
            this: T & { findUnique: Function },
            id: string
          ) {
            const response = await this.findUnique({ where: { id } })
            return response
          }
        }
      }
    })

  ) {
    if (PrismaSingleton.Instance !== undefined) return PrismaSingleton.Instance
    else PrismaSingleton.Instance = this
    return this
  }
}
