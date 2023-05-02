import { Router } from 'express'
import { CartController } from './cart.controller'
import passport from 'passport'
const cartController = new CartController()
export const cartRouter = Router()

cartRouter.get('/addproduct/:id/:quantity', passport.authenticate('jwt'), cartController.addProduct)
cartRouter.delete('/deleteproduct/:cid/:pid', cartController.deleteProduct)
cartRouter.put('/updateproducts/:id', cartController.updateProducts)
cartRouter.post('/:id', cartController.createCart)
cartRouter.put('/:id', cartController.updateCart)
cartRouter.delete('/:id', cartController.deleteCart)
cartRouter.get('/', cartController.listCarts)
cartRouter.get('/:id', cartController.cartById)
