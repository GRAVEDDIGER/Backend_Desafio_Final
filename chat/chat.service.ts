import { PrismaSingleton } from '../services/database.service'
import { CreateChatDto } from './entities/chat.dto'

export class ChatService extends PrismaSingleton {
  public createChat
  public updateChat
  public deleteChat
  public listChats
  public getByIdChat
  constructor (
  ) {
    super()
    this.createChat = async (dto: CreateChatDto) => await this.prisma.messages.createGeneric(dto)
    this.updateChat = async (dto: CreateChatDto, id: string) => await this.prisma.messages.updateGeneric(dto, id)
    this.deleteChat = async (id: string) => await this.prisma.messages.deleteGeneric(id)
    this.listChats = async () => await this.prisma.messages.listGeneric()
    this.getByIdChat = async (id: string) => await this.prisma.messages.getByIdGeneric(id)
  }
}
