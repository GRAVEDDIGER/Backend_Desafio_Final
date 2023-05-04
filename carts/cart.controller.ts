import { Request, Response } from 'express'
import { CartService } from './cart.service'
import { CreateCartDto } from './entities'
import { logger } from '../logger/logger.service'
import { IResponse } from '../index'
import { ResponseObject } from '../entities'
import { ProductService } from '../products/products.service'
import { UsersService } from '../users/users.service'
import { ProductType, UserType } from '../entities/models'
import { Prisma } from '@prisma/client'
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
          const dto: Partial<ProductType> = product.response
          let userDto: Partial<Prisma.usersCreateInput>
          let finalDto: UserType
          if (req.user !== undefined) {
            userDto = req.user as Prisma.usersCreateInput
            if (userDto.createdAt !== undefined) delete userDto.createdAt
            if (userDto.hash !== undefined) delete userDto.hash
            if (userDto.updatedAt !== undefined) delete userDto.updatedAt
            if (userDto.Carts !== undefined) delete userDto.Carts

            finalDto = userDto as UserType
          } else {
            res.redirect('/auth/login')
            throw new Error('User must be Logged in')
          }
          if ('createdAt' in dto) { delete dto.createdAt }
          if ('updatedAt' in dto) { delete dto.updatedAt }
          dto.quantity = parseInt(req.params.quantity)
          const productDto: ProductType = dto as ProductType
          this.cartService.createCart({ user: finalDto, products: [{ ...productDto }] }).then((response: IResponse) => {
            if (response.ok) {
              // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
              if (req.user !== undefined && req.user !== null && 'id' in req.user && req.user.id !== undefined && req.user.id !== null) {
                this.usersService.update({ Carts: response.response.id as string }, req.user.id as string)
                  .then((cart) => {
                    console.log(cart)
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
          console.log({ cartId }, 'CartId There is  a Cart on the user Db')
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
              console.log(product)
              this.cartService.addProduct(productDto, cartId)
                .then(() => { res.redirect(`/carts/${cartId}`) })
                .catch(error => { logger.error({ function: 'cartController.addProduct', error }) })
            })
            .catch(error => {
              logger.error({ function: 'CartController.addProduct', error })
              res.status(404).send(error)
            })
        } else {
          this.createCart(req, res)
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
        if (req.user !== undefined && 'id' in req.user) {
          this.usersService.deleteCart(req.user.id as string)
            .then(() => {
              if (response.ok) res.status(200).send(response)
              else res.status(400).send(response)
            })
            .catch(error => { logger.error({ function: 'cartController.deleteCart', error }) })
        }
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
      let { id } = req.params
      if (id === undefined) {
        if (req.user !== undefined && 'Carts' in req.user) {
          id = req.user.Carts as string
        } else { res.render('inexistentCart') }
      }
      if (id === undefined || id === null) res.redirect('/products')
      console.log(id)
      this.cartService.cartById(id)
        .then((response: IResponse) => {
          const products: Prisma.ProductTypeCreateInput[] = response.response.products as Prisma.ProductTypeCreateInput[]
          const price: number = products.reduce((previous, current): number => {
            const price: number = current.price
            const quantity: number = current.quantity
            return previous + (price * quantity)
          }, 0)
          if (response.ok) res.render('cart', { products: response.response.products, cartId: id, priceWithoutTaxes: price, priceWithTaxes: (price * 0.21) + price })
          else res.render('inexistentCart')
        })
        .catch((error: any) => {
          logger.error({
            function: 'cartController.cartById',
            error
          })
          return new ResponseObject(error, false, null)
        })
    },
    public deleteProduct = (req: Request, res: Response) => {
      const { cid, pid } = req.params
      this.cartService.deleteProduct(cid, pid)
        .then((response) => {
          logger.debug({ function: 'cartController.deleteProduct', response })
          res.send({ response })
        })
        .catch(error => { logger.error({ function: 'cartsControler.deleteProduct', error }) })
    },
    public updateProducts = (req: Request, res: Response) => {
      const { id } = req.params
      const productArray: number[] = req.body as number[]
      this.cartService.updateProducts(id, productArray)
        .then(response => {
          res.send(response)
        })
        .catch(error => {
          logger.error({ function: 'CartController.updateProducts', error })
          res.status(404).send(error)
        })
    }
  ) {
    // SINGLETON PATTERN
    if (CartController.Instance !== undefined) return CartController.Instance
    else CartController.Instance = this
    return this
  }
}
