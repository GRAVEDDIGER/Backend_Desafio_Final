import { PrismaClient, Prisma } from '@prisma/client'
import { logger } from '../logger/logger.service'
import { ResponseObject } from '../entities'
import { IResponse } from '../index'

export class PrismaSingleton {
  static Instance: any
  constructor (
    public prisma = new PrismaClient().$extends({
      model: {
        $allModels: {
          async createGeneric<T>(
            this: T & { create: Function },
            x: Prisma.Args<T, 'create' >['data']
          ): Promise<IResponse> {
            const modelName = Prisma.getExtensionContext(this).name
            try {
              const response = await this.create({ data: x })
              return new ResponseObject(null, true, response)
            } catch (error) {
              logger.error({
                function: `${modelName}CreateGeneric`,
                error
              })
              return new ResponseObject(error, false, null)
            }
          },
          async updateGeneric<T>(
            this: T & { update: Function },
            data: Prisma.Args<T, 'update'>['data'],
            id: string
          ): Promise<IResponse> {
            const model = Prisma.getExtensionContext(this).name
            try {
              const response = await this.update({ where: { id }, data })
              return new ResponseObject(null, true, response)
            } catch (error) {
              logger.error({
                function: `${model}updateGeneric`,
                error
              })
              return new ResponseObject(error, false, null)
            }
          },
          async deleteGeneric<T>(
            this: T & { delete: Function },
            id: string
          ): Promise<IResponse> {
            const model = Prisma.getExtensionContext(this).name
            try {
              const response = await this.delete({ where: { id } })
              return new ResponseObject(null, true, response)
            } catch (error) {
              logger.error({
                function: `${model}DeleteGeneric`,
                error
              })
              return new ResponseObject(error, false, null)
            }
          },
          async listGeneric <T>(
            this: T & { findMany: Function }
          ): Promise<IResponse> {
            const model = Prisma.getExtensionContext(this).name
            try {
              const response = await this.findMany()
              return new ResponseObject(null, true, response)
            } catch (error) {
              logger.error({
                function: `${model}ListGeneric`, error
              })
              return new ResponseObject(error, false, null)
            }
          },
          async getByIdGeneric <T>(
            this: T & { findUnique: Function },
            id: string
          ): Promise<IResponse> {
            const model = Prisma.getExtensionContext(this).name
            try {
              const response = await this.findUnique({ where: { id } })
              return new ResponseObject(null, true, response)
            } catch (error) {
              logger.error({
                function: `${model}GetByIdGeneric`, error
              })
              return new ResponseObject(error, false, null)
            }
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
