import { Router } from 'express'
import { CartController } from './cart.controller'
import { AuthController } from '../auth/auth.controller'
const authController = new AuthController()
const cartController = new CartController()
export const cartRouter = Router()

cartRouter.get('/addproduct/:id/:quantity', authController.jwtGuard, cartController.addProduct)
cartRouter.delete('/deleteproduct/:cid/:pid', authController.jwtGuard, cartController.deleteProduct)
cartRouter.put('/updateproducts/:id', authController.jwtGuard, cartController.updateProducts)
cartRouter.post('/:id', authController.jwtGuard, cartController.createCart)
// cartRouter.put('/:id',authController.jwtGuard ,cartController.updateCart)
cartRouter.delete('/:id', authController.jwtGuard, cartController.deleteCart)
cartRouter.get('/', authController.jwtGuard, cartController.cartById)
cartRouter.get('/:id', authController.jwtGuard, cartController.cartById)
