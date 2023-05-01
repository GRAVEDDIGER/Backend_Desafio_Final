import { ProductController } from './products.controller'
import { Response, Router, Request } from 'express'
import passport from 'passport'
export const productRouter = Router()
const productController = new ProductController()
productRouter.post('/', passport.authenticate('jwt', { session: false }), productController.createProduct)
productRouter.put('/:id', productController.updateProduct)
productRouter.delete('/:id', productController.deleteProduct)
productRouter.get('/', passport.authenticate('jwt', { session: false }), productController.listProducts)
productRouter.get('/update/:id', productController.getUpdate)
productRouter.get('/add', (req: Request, res: Response) => {
  res.render('addproduct')
})

productRouter.get('/:id', passport.authenticate('jwt', { session: false }), productController.productById)
