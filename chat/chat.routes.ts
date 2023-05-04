import { ChatController } from './chat.controller'
import { Router } from 'express'
import { AuthController } from '../auth/auth.controller'
const authController = new AuthController()
export const chatRouter = Router()

const chatController = new ChatController()
chatRouter.post('/', chatController.createChat)
chatRouter.put('/:id', chatController.updateChat)
chatRouter.delete('/:id', chatController.deleteChat)
chatRouter.get('/', authController.jwtGuard, chatController.listChats)
chatRouter.get('/:id', chatController.getByIdChat)
