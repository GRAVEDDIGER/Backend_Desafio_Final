import { Request, Response } from 'express'
import { CreateSalesDto } from './entities'
import { SalesService } from './sales.service'
import { logger } from '../logger/logger.service'

export class SalesController {
  static Instance: any
  constructor (
    private readonly service = new SalesService(),
    public create = (req: Request, res: Response): void => {
      const dto: CreateSalesDto = req.body
      this.service.create(dto).then((response: any) => {
        res.status(201).send(response)
      }).catch((error: any) => {
        res.status(404).send(error)
      })
    },
    public update = (req: Request, res: Response): void => {
      const dto: CreateSalesDto = req.body
      const { id } = req.params
      this.service.update(id, dto).then((response: any) => {
        res.status(200).send(response)
      }).catch((error: any) => {
        logger.error({
          function: 'SalesController.update',
          error
        })
        res.status(404).send(error)
      })
    },
    public deleteData = (req: Request, res: Response) => {
      const { id } = req.params
      this.service.deleteData(id).then((response: any) => {
        res.status(200).send(response)
      }).catch((error: any) => {
        res.status(404).send(error)
      })
    },
    public listAll = (_req: Request, res: Response) => {
      this.service.listAll().then((response) => {
        res.status(200).send(response)
      }).catch((error: any) => {
        res.status(404).send(error)
      })
    },
    public getById = (req: Request, res: Response) => {
      const { id } = req.params
      this.service.getByID(id).then((response) => {
        res.status(200).send(response)
      }).catch((error: any) => {
        res.status(404).send(error)
      })
    }

  ) {
    if (SalesController.Instance !== undefined) {
      return SalesController.Instance
    } else {
      SalesController.Instance = this
      return this
    }
  }
}
