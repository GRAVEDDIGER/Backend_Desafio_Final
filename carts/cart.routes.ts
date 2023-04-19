import { Router } from 'express'
import { CartController } from './cart.controller'
const cartController = new CartController()
export const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
cartRouter.put('/:id', cartController.updateCart)
cartRouter.delete('/:id', cartController.deleteCart)
cartRouter.get('/', cartController.listCarts)
cartRouter.get('/:id', cartController.cartById)
