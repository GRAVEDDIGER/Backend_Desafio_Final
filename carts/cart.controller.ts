import { Request, Response } from 'express'
import { CartService } from './cart.service'
import { CreateCartDto } from './entities'
import { logger } from '../logger/logger.service'
import { IResponse } from '../index'
import { ResponseObject } from '../entities'
import { ProductService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { ProductType } from '../entities/models'
export class CartController {
  static Instance: any
  constructor (
    private readonly cartService = new CartService(),
    private readonly usersService = new UsersService(),
    private readonly productService = new ProductService(),
    public createCart = (req: Request, res: Response) => {
      const { id } = req.params
      this.productService.productById(id)
        .then(product => {
          const dto: CreateCartDto = product.response
          this.cartService.createCart(dto).then((response: IResponse) => {
            if (response.ok) {
              // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
              if (req.user !== undefined && req.user !== null && 'id' in req.user && req.user.id !== undefined && req.user.id !== null) {
                this.usersService.update({ carts: response.response.id as string }, req.user.id as string)
                  .then(() => {
                    res.redirect(`/carts/${response.response.id as string}`)
                  })
                  .catch(error => { logger.error({ function: 'cartController.usersService', error }) })
              }
            } else res.status(400).send(response)
          }).catch((error: any) => {
            logger.error({
              function: 'CartController.createCart',
              error
            })
            res.status(400).send(error)
          })
        })
        .catch(error => { logger.error({ function: 'CartController.createCart', error }) })
    },
    public addProduct = (req: Request, res: Response) => {
      const productId = req.params.id
      const quantityVar = req.params.quantity
      console.log('cosito', productId, quantityVar)
      let cartId: string
      if (req.user !== undefined && 'id' in req.user) {
        if ('Carts' in req.user && req.user.Carts !== undefined && req.user.Carts !== null) {
          cartId = req.user.Carts as string
          console.log(cartId)
          this.productService.productById(productId)
            .then((product: IResponse) => {
              const productDto: ProductType = {
                name: product.response.name,
                description: product.response.description,
                id: product.response.id,
                stock: product.response.stock,
                quantity: parseInt(quantityVar),
                price: product.response.price,
                category: product.response.category,
                rate: product.response.rate
              }
              this.cartService.addProduct(productDto, cartId)
                .then(() => { res.redirect('/products') })
                .catch(error => { logger.error({ function: 'cartController.addProduct', error }) })
            })
            .catch(error => {
              logger.error({ function: 'CartController.addProduct', error })
              res.status(404).send(error)
            })
        } else {
          // aca genero el nuevo cart
        }
      } else {
        console.log('no user')
        res.redirect('/auth/login')
      }
      // console.log(req.user)
    },
    public updateCart = (req: Request, res: Response) => {
      const { id } = req.params
      if (id === undefined) res.status(404).send({ error: 'ID is required', ok: false, response: null })
      const dto: CreateCartDto = req.body

      this.cartService.updateCart(dto, id)
        .then((response: IResponse) => {
          if (response.ok) res.status(200).send(response)
          else res.status(400).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'CartController.updateCart',
            error
          })
          res.status(400).send(error)
        })
    },
    public deleteCart = (req: Request, res: Response) => {
      const { id } = req.params
      this.cartService.deleteCart(id).then((response: IResponse) => {
        if (response.ok) res.status(200).send(response)
        else res.status(400).send(response)
      })
        .catch((error: any) => {
          logger.error({
            function: 'CartController.deleteCart',
            error
          })
        })
    },
    public listCarts = (_req: Request, res: Response) => {
      this.cartService.listCarts()
        .then((response: IResponse) => {
          if (response.ok) res.status(200).send(response)
          else res.status(400).send(response)
        })
        .catch((error: any) => {
          logger.error({ function: 'CartController.listCarts', error })
          res.status(400).send(error)
        })
    },
    public cartById = (req: Request, res: Response) => {
      const { id } = req.params
      this.cartService.cartById(id)
        .then((response: IResponse) => {
          if (response.ok) res.render('cart', { products: response.response })// status(200).send(response)
          else res.status(404).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'cartController.cartById',
            error
          })
          return new ResponseObject(error, false, null)
        })
    }
  ) {
    // SINGLETON PATTERN
    if (CartController.Instance !== undefined) return CartController.Instance
    else CartController.Instance = this
    return this
  }
}
