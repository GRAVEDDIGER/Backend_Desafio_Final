import { PrismaClient, ProductType } from '@prisma/client'
import { CreateCartDto } from './entities/cart.dto'
import { logger } from '../logger/logger.service'
import { ResponseObject } from '../entities'

export class CartService {
  static Instance: any
  constructor (
    private readonly prisma = new PrismaClient().carts,
    public createCart = async (createCartDto: CreateCartDto) => {
      let response: any
      try {
        response = await this.prisma.create({ data: createCartDto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'CartService.createCart',
          error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public addProduct = async (product: ProductType, id: string) => {
      return await this.prisma.update({ where: { id }, data: { products: { push: product } } })
        .then(response => new ResponseObject(null, true, response))
        .catch(error => {
          logger.error({ function: 'cartService.addProduct', error })
          return new ResponseObject(error, false, null)
        })
    },
    public updateCart = async (updateDto: CreateCartDto, id: string) => {
      let response: any
      try {
        response = await this.prisma.update({ where: { id }, data: updateDto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'CartService.updateCart',
          error

        })
        return new ResponseObject(error, false, ('code' in error && error.code === 'P2025' ? 'Id Not Found' : 'Something went wrong'))
      }
    },
    public deleteCart = async (id: string) => {
      let response: any
      try {
        response = await this.prisma.delete({ where: { id } })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'CartService.deleteCart',
          error
        })
        return new ResponseObject(error, false, ('code' in error && error.code === 'P2025' ? 'Id Not Found' : 'Something went wrong'))
      }
    },
    public listCarts = async () => {
      let response: any[]
      try {
        response = await this.prisma.findMany()
        console.log(response)
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'CartService.listCarts',
          error
        })
        return new ResponseObject(error, false, null)
      }
    },
    public cartById = async (id: string) => {
      let response: any
      try {
        response = await this.prisma.findUniqueOrThrow({ where: { id } })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({ function: 'CartService.cartById', error })
        return new ResponseObject(error, false, ('code' in error && error.code === 'P2025' ? 'Id Not Found' : 'Something went wrong'))
      }
    }
  ) {
    // SINGLETON PATTERN
    if (CartService.Instance !== undefined) return CartService.Instance
    else {
      CartService.Instance = this
      return this
    }
  }
}
