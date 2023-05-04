import { Request, Response } from 'express'
import { CreateSalesDto } from './entities'
import { SalesService } from './sales.service'
import { logger } from '../logger/logger.service'
import { sendMailtoUser } from '../nodemailer/nodemailer.service'

export class SalesController {
  static Instance: any
  constructor (
    private readonly service = new SalesService(),
    public create = (req: Request, res: Response): void => {
      const { id } = req.params
      let userId: string
      if (req.user !== undefined && 'id' in req.user) {
        userId = req.user.id as string
      } else {
        res.redirect('/auth/login')
        throw new Error('User must be logged')
      }
      this.service.createSale(userId, id)
        .then(response => {
          logger.debug({ function: 'SalesController.create', response })
          if (req.user !== undefined && 'username' in req.user) { sendMailtoUser(req.user.username as string, 'Order Acomplished', JSON.stringify(response)) }
          res.send(response)
        })
        .catch(error => {
          logger.error({ function: 'SalesController.createSale', error })
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
