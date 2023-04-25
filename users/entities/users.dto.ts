import { type Prisma } from '@prisma/client'
import bcrypt from 'bcrypt'
interface Address {
  street: string
  number: number
  city: string
  zipCode: string
}

export class CreateUsersDto implements Omit<Omit<Prisma.usersCreateInput, 'id'>, 'hash'> {
  public hash: string
  constructor (
    public name: string,
    public username: string,
    public lastName: string,
    public phoneNumber: number,
    public address: Address,
    public password?: string) {
    if (this.password !== undefined) this.hash = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10))
    else this.hash = ''
  }
}
