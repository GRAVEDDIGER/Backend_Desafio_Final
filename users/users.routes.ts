import { Router } from 'express'
import { userController } from './users.controller'
export const userRoutes = Router()
userRoutes.post('/', userController.createUser)
userRoutes.put('/:id', userController.updateUser)
userRoutes.get('/:id', userController.findUserById)
// userRoutes.get('/', userController.listUsers)
userRoutes.delete('/:id', userController.deleteUser)
