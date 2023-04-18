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
    }
  ) {
    if (CartService.Instance !== undefined) return CartService.Instance
    else {
      CartService.Instance = this
      return this
    }
  }
}
