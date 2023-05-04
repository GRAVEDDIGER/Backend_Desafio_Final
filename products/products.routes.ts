import { ProductController } from './products.controller'
import { Response, Router, Request } from 'express'
import { AuthController } from '../auth/auth.controller'
import { productValidation } from './products.validator'
const authController = new AuthController()
export const productRouter = Router()
const productController = new ProductController()
productRouter.get('/addfailed', productController.errorHandler)
productRouter.post('/', authController.jwtGuard, productValidation, productController.createProduct)
productRouter.put('/:id', authController.jwtGuard, productController.updateProduct)
productRouter.get('/category/:id', authController.jwtGuard, productController.listByCategory)
productRouter.delete('/:id', authController.jwtGuard, productController.deleteProduct)
productRouter.get('/', authController.jwtGuard, productController.listProducts)
productRouter.get('/update/:id', authController.jwtGuard, productController.getUpdate)
productRouter.get('/add', authController.jwtGuard, (_req: Request, res: Response) => {
  res.render('addproduct')
})
productRouter.get('/:id', authController.jwtGuard, productController.productById)
