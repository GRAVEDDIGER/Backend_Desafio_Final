import { ProductController } from './products.controller'
import { Router } from 'express'
export const productRouter = Router()
const productController = new ProductController()
productRouter.post('/', productController.createProduct)
productRouter.put('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProduct)
productRouter.get('/', productController.listProducts)
productRouter.get('/:id', productController.productById)
