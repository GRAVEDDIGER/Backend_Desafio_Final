import { CreateChatDto } from './entities/chat.dto'
import { ChatService } from './chat.service'
import { Request, Response } from 'express'
import { logger } from '../logger/logger.service'
import { IResponse } from '../index'
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
    public listChats = (_req: Request, res: Response) => {
      this.service.listChats()
        .then((response: IResponse) => {
          if (response.ok) res.status(200).send(response)
          else res.status(404).send(response)
        }).catch((error: any) => {
          logger.error({
            function: 'ChatController.listChats', error
          })
          res.status(404).send(error)
        })
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
