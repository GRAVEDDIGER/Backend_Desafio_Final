import { PrismaSingleton } from '../services/database.service'
import { ListFunction, listFunction } from '../services/functions.service'
export class SalesService extends PrismaSingleton {
  public listSales: listFunction<'sales'>
  constructor () {
    super()
    this.listSales = ListFunction('carts', this.prisma).listCarts
  }
}
const d = new SalesService()
d.listSales()
