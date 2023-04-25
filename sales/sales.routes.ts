import { SalesController } from './sales.controller'
import { Router } from 'express'
export const salesRouter = Router()
const salesController = new SalesController()
salesRouter.post('/', salesController.create)
salesRouter.put('/:id', salesController.update)
salesRouter.delete('/:id', salesController.deleteData)
salesRouter.get('/', salesController.listAll)
salesRouter.get('/:id', salesController.getById)
