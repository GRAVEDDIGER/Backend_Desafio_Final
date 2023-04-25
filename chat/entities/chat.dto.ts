
import { Prisma, UserType } from '@prisma/client'
export class CreateChatDto implements Prisma.messagesCreateInput {
  constructor (
    public message: string,
    public author: UserType) {}
}
