import { PrismaClient } from '@prisma/client'
export class PrismaSingleton {
  static Instance: any
  constructor (public prisma = new PrismaClient()) {
    if (PrismaSingleton.Instance !== undefined) return PrismaSingleton.Instance
    else PrismaSingleton.Instance = this
    return this
  }
}
