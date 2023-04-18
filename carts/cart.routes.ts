import { Router } from 'express'
import { CartController } from './cart.controller'
const cartController = new CartController()
const cartRouter = Router()

cartRouter.post('/', cartController.createCart)
