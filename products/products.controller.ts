import { ProductService } from './products.service'
import { type Request, type Response } from 'express'
import { CreateProductDto } from './entities/product.dto'
import { logger } from '../logger/logger.service'
import { type IResponse } from '../index'
export class ProductController {
  constructor (
    private readonly productService: ProductService = new ProductService(),
    public createProduct = (req: Request, res: Response): void => {
      const { name, description, rate, stock, price, category } = req.body
      const dto: CreateProductDto = new CreateProductDto(name, description, parseInt(stock), parseInt(rate), parseInt(price), category)
      console.log(dto, 'body')
      this.productService.createProduct(dto).then((response: any) => {
        logger.debug({
          function: 'ProductController.CreateProductDto',
          dto
        })
        if ('ok' in response && response.ok === true) res.status(201).send(response)
        else res.status(404).send(response)
      }).catch((error: any) => {
        logger.error({
          function: 'CreateProduct.createProduct', error
        })
        res.status(400).send(error)
      })
    },
    public updateProduct = (req: Request, res: Response) => {
      const { name, description, price, rate, category, stock } = req.body
      const dto: Partial<CreateProductDto> =
        new CreateProductDto(
          name,
          description,
          parseInt(stock),
          parseInt(rate),
          parseInt(price),
          category)
      const { id } = req.params
      this.productService.updateProduct(dto, id)
        .then((response: IResponse) => {
          if ('ok' in response && response.ok) {
            res.status(200).send(response)
          } else res.status(404).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'ProductController.updateProduct',
            error
          })
          res.status(404).send(error)
        })
    },
    public deleteProduct = (req: Request, res: Response) => {
      const { id } = req.params
      this.productService.deleteProduct(id)
        .then((response: IResponse) => {
          if (response.ok) res.status(200).send(response)
          else res.status(404).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'ProductController.deleteProduct',
            error
          })
          res.status(404).send(error)
        })
    },
    public listProducts = (_req: Request, res: Response) => {
      this.productService.listProducts()
        .then((response: IResponse) => {
          if (response.ok) res.render('showproducts', { products: response.response })
          else res.status(404).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'ProductController.listProducts',
            error
          })
          res.status(404).send(error)
        })
    },
    public productById = (req: Request, res: Response) => {
      const { id } = req.params
      this.productService.productById(id)
        .then((response: IResponse) => {
          if (response.ok) res.render('showproduct', { ...response.response })
          else res.status(404).send(response)
        })
        .catch((error: any) => {
          logger.error({
            function: 'ProductController.productById',
            error
          })
          res.status(404).send(error)
        })
    },
    public getUpdate = (req: Request, res: Response) => {
      const { id } = req.params
      this.productService.productById(id).then(response => {
        console.log(response)
        res.render('editproduct', { ...response.response })
      })
        .catch((error: any) => { logger.error({ function: 'ProductController.getUpdate', error }) })
    }
  ) {
  }
}
