import { PrismaClient } from '@prisma/client'
import { IResponse } from '../index'
import { ResponseObject } from '../entities'
import { CreateProductDto } from './entities/product.dto'
import { logger } from '../logger/logger.service'

export class ProductService {
  static Instance: any
  constructor (
    private readonly prisma = new PrismaClient().products,
    public createProduct = async (createProductDto: CreateProductDto): Promise<IResponse> => {
      let response: any
      try {
        response = await this.prisma.create({ data: createProductDto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({ function: 'ProductService.createProduct', error })
        return new ResponseObject(error, false, null)
      }
    },
    public updateProduct = async (updateProductDto: Partial<CreateProductDto>, id: string) => {
      let response: any
      try {
        response = await this.prisma.update({ where: { id }, data: updateProductDto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'ProductService.updateProduct',
          error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public deleteProduct = async (id: string) => {
      let response: any
      try {
        response = await this.prisma.delete({ where: { id } })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({ function: 'ProductService.deleteProduct', error })
        return new ResponseObject(error, false, null)
      }
    },
    public listProducts = async () => {
      let response: any[]
      try {
        response = await this.prisma.findMany()
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'ProductService.listProducts', error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public productById = async (id: string) => {
      let response: any
      try {
        response = await this.prisma.findUniqueOrThrow({ where: { id } })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'ProductService.productById',
          error
        })
        return new ResponseObject(error, false, ('code' in error && error.code === 'P2025' ? 'Id Not Found' : 'Something went wrong'))
      }
    }
  ) {
    if (ProductService.Instance !== undefined) return ProductService.Instance
    ProductService.Instance = this
    return ProductService.Instance
  }
}
