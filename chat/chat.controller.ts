import { CreateChatDto } from './entities/chat.dto'
import { ChatService } from './chat.service'
import { Request, Response } from 'express'
import { logger } from '../logger/logger.service'
import { IResponse } from '../index'
import { Server } from 'socket.io'
import { server } from '../app.module'
import { Prisma } from '@prisma/client'
export class ChatController {
  constructor (
    private readonly service = new ChatService(),
    public createChat = (req: Request, res: Response) => {
      const dto: CreateChatDto = req.body
      this.service.createChat(dto)
        .then((response: IResponse) => {
          if (response.ok) res.status(201).send(response)
          else res.status(404).send(response)
        })
        .catch((error) => {
          logger.error({
            function: 'ChatController.create',
            error
          })
        })
    },
    public updateChat = (req: Request, res: Response) => {
      const dto: CreateChatDto = req.body
      const { id } = req.params

      this.service.updateChat(dto, id).then((response) => {
        if (response.ok) res.status(200).send(response)
        else res.status(404).send(response)
      }).catch((error) => {
        logger.error({
          function: 'ChatController.updateChat', error
        })
        res.status(404).send(error)
      })
    },
    public deleteChat = (req: Request, res: Response) => {
      const { id } = req.params
      this.service.deleteChat(id)
        .then((response) => {
          if (response.ok) res.status(200).send(response)
          else res.status(404).send(response)
        }).catch((error: any) => {
          logger.error({
            function: 'ChatController.deleteChat', error
          })
          res.status(404).send(error)
        })
    },
    public listChats = (req: Request, res: Response) => {
      const io = new Server(server).serveClient(true)
      io.on('connection', (socket) => {
        logger.info({ function: 'chatController.listChats', message: 'WebSockets Connected' })
        if (req.user !== undefined && 'username' in req.user) {
          socket.emit('userInfo', req.user.username as string)
        }
        this.service.listChats()
          .then(response => {
            if (response.ok) {
              const chatData: Prisma.messagesCreateInput[] = response.response as Prisma.messagesCreateInput[]
              chatData.forEach(post => {
                io.emit('serverMessage', JSON.stringify({ response: { ...post, id: undefined } }))
              })
            }
          })
          .catch(error => logger.error({ function: 'chatController.listChats', error }))
        socket.on('clientMessage', (message) => {
          if (req.user !== undefined) {
            console.log(message, req.user)
            const userData: Prisma.usersCreateInput = req.user as Prisma.usersCreateInput
            this.service.createChat({
              author: {
                id: userData.id as string,
                lastName: userData.lastName,
                name: userData.name,
                phoneNumber: userData.phoneNumber,
                username: userData.username
              },
              message
            })
              .then((response) => {
                io.emit('serverMessage', JSON.stringify({ ...response, id: undefined }))
              })
              .catch((error) => { logger.error({ function: 'ChatController.listChats', error }) })
          } else console.log('User not logged in')
        })
      })
      res.render('chat')
    },
    public getByIdChat = (req: Request, res: Response) => {
      const { id } = req.params
      try {
        this.service.getByIdChat(id)
          .then((response: IResponse) => {
            if (response.ok) res.status(200).send(response)
            else res.status(404).send(response)
          })
          .catch((error: any) => {
            logger.error({
              function: 'ChatController.getByIdChat', error
            })
            res.status(404).send(error)
          })
      } catch (error) {
        logger.error({
          function: 'ChatController.getByIdChat', error
        })
      }
    }
  ) {}
}
