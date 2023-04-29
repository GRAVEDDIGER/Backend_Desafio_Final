import { ProductController } from './products.controller'
import { Router } from 'express'
import { AuthController } from '../auth/auth.controller'
const authController = new AuthController()
export const productRouter = Router()
const productController = new ProductController()
productRouter.post('/', productController.createProduct)
productRouter.put('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProduct)
productRouter.get('/', authController.routeGuard, productController.listProducts)
productRouter.get('/:id', productController.productById)
