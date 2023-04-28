import { ChatController } from './chat.controller'
import { Router } from 'express'
export const chatRouter = Router()
const chatController = new ChatController()
chatRouter.post('/', chatController.createChat)
chatRouter.put('/:id', chatController.updateChat)
chatRouter.delete('/:id', chatController.deleteChat)
chatRouter.get('/', chatController.listChats)
chatRouter.get('/:id', chatController.getByIdChat)
