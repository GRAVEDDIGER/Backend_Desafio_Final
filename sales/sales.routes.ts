import { AuthController } from '../auth/auth.controller'
import { SalesController } from './sales.controller'
import { Router } from 'express'
const authController = new AuthController()
export const salesRouter = Router()
const salesController = new SalesController()
salesRouter.post('/:id', authController.jwtGuard, salesController.create)
