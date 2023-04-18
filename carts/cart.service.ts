import { PrismaClient } from '@prisma/client'
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
    public updateCart = async (updateDto: CreateCartDto, id: string) => {
      let response: any
      try {
        response = this.prisma.update({ where: { id }, data: updateDto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'CartService.updateCart',
          error
        })
        return new ResponseObject(error, false, null)
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
