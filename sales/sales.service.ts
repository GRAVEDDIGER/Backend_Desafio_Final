import { IResponse } from '../index'
import { ResponseObject } from '../entities'
import { logger } from '../logger/logger.service'
import { PrismaSingleton } from '../services/database.service'
import { CreateSalesDto } from './entities'
export class SalesService extends PrismaSingleton {
  constructor (
    public create = async (dto: CreateSalesDto): Promise<IResponse> => {
      let response: any
      try {
        // await this.prisma.sales.create({ data: dto })
        response = await this.prisma.sales.create({ data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({ function: 'SalesService.create', error })
        return new ResponseObject(error, false, null)
      }
    },
    public update = async (id: string, dto: CreateSalesDto): Promise<IResponse> => {
      let response: any
      try {
        response = await this.prisma.sales.update({ where: { id }, data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'SalesService.update',
          error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public deleteData = async (id: string) => {
      let response: any
      try {
        response = await this.prisma.sales.delete({ where: { id } })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'SalesService.deleteData',
          error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public listAll = async (): Promise<IResponse> => {
      let response: any[]
      try {
        response = await this.prisma.sales.findMany()
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'SalesService.listAll',
          error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public getByID = async (id: string): Promise<IResponse> => {
      let response: any
      try {
        response = await this.prisma.sales.findUnique({ where: { id } })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'SalesService.getById',
          error
        })
        return new ResponseObject(error, false, null)
      }
    }

  ) {
    super()
  }
}
