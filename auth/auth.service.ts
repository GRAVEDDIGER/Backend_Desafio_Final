import { logger } from '../logger/logger.service'
import { PrismaSingleton } from '../services/database.service'
import bcrypt from 'bcrypt'
import { CreateUsersDto } from '../entities'
import { type Request } from 'express'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
const privateKey = fs.readFileSync('auth/id_rsa_priv.pem')
export class AuthService extends PrismaSingleton {
  public verifyLocalLogin
  public signUpLocal
  public verifyJwt
  private readonly validateUser: (user: CreateUsersDto, data: any, done: (error: any, user: any, message?: any) => any) => CreateUsersDto
  public serialize: (user: any, done: (error: any, id: string | undefined) => void) => void
  public deSerialize: (id: string, done: any) => void
  public jwtIssuance: (data: any) => string
  constructor () {
    super()
    this.verifyLocalLogin = (username: string, password: string, done: (error: any, user: any, message?: any) => any): void => {
      console.log(username, password)
      this.prisma.users.findUnique({ where: { username } }).then((response: any) => {
        const user: CreateUsersDto = response as CreateUsersDto
        console.log(user, 'login')
        if (user !== null && user !== undefined && 'username' in user) {
          const isValid = bcrypt.compareSync(password, user.hash)
          console.log('user exists', isValid)
          if (isValid) {
            console.log('password match')
            done(null, user)
          } else done(null, false, { message: `Password doesnt match with user:${user.username}` })
        } else done(null, false, { message: `User ${username} doesnt exist` })
      }).catch((error: any) => {
        logger.error({ function: 'AuthService.verifyLocalLogin', error })
        done(error, false, { message: 'Server error' })
      })
    }
    this.signUpLocal = (req: Request, username: string, _password: string, done: (error: any, user: any, message?: any) => any): void => {
      console.log(req.body)
      this.prisma.users.findUnique({ where: { username } })
        .then((response: any) => {
          const user: CreateUsersDto = response as CreateUsersDto
          if (user?.username !== undefined) done(null, false, { message: `User ${username} alrready exists` })

          else {
            const data: any = req.body
            // const response = this.validateUser(user, data, done)
            bcrypt.genSalt(10).then(salt => {
              bcrypt.hash(data.password, salt).then(hash => {
                data.hash = hash
                delete data.password
                console.log('doesnt exist', data)
                this.prisma.users.create({ data })
                  .then((response: any) => {
                    console.log('User Created')
                    done(null, response)
                  })
                  .catch((error: any) => {
                    logger.error({
                      function: 'AuthService.signUpLocal', error
                    })
                    done(error, { message: 'Server error:' })
                  })
                // done(null, user)
              }).catch(error => { logger.error({ function: 'signUpLocal hash', error }) })
            }).catch(error => { logger.error({ function: 'signUpLocal', error }) })
          }
        })
        .catch((error: any) => {
          logger.error({ function: 'AuthService.signUpLocal', error })
          done(error, false, { message: 'Server error' })
        })
    }
    this.validateUser = (user, data, done): CreateUsersDto => {
      user = new CreateUsersDto(data.name, data.username, data.lastName, data.phoneNumber, undefined, data.password)
      console.log(user)
      user.password = (data.password !== undefined)
        ? data.password
        : done(null, false, { message: 'password is required' })
      user.lastName = (data?.lastName !== undefined)
        ? data.lastName
        : done(null, false, { message: 'lastName is required' })
      user.name = (data?.name !== undefined)
        ? data.name
        : done(null, false, { message: 'name is required' })
      user.phoneNumber = (data?.name !== undefined)
        ? data.phoneNumber
        : null
      user.username = (data?.username !== undefined)
        ? data.username
        : done(null, false, { message: 'username is required' })
      const emailValidationRx = /^(([^<>()[\]\\.,;:\s@”]+(\.[^<>()[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/
      if (!emailValidationRx.test(user.username)) done(null, false, { message: 'username should be  an email address' })

      const passwordValidationRx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
      if (user.password !== undefined) {
        if (!passwordValidationRx.test(user.password)) done(null, false, { message: 'Password should have Minimum 8 characters, maximum 15, at least one uppercase letter, at least one lowercase letter, at least one digit, no white spaces, and at least 1 special character.' })
      }
      delete user.password
      return user
    }
    this.serialize = (user, done) => {
      if ('id' in user) done(null, user.id)
    }
    this.deSerialize = (id, done) => {
      this.prisma.users.findUnique({ where: { id } }).then((user: any) => done(null, user)).catch((error: any) => done(error))
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.verifyJwt = (jwt_payload: string, done: (error: any, user?: any, message?: any) => any) => {
      this.prisma.users.findUnique({ where: { id: jwt_payload } })
        .then((response: unknown) => {
          const user: CreateUsersDto = response as CreateUsersDto
          if (user !== null && 'username' in user) done(null, user)
          else done(null, false)
        })
        .catch((error: any) => {
          logger.error({
            function: 'AuthService.verifyJwt', error
          })
          done(error)
        })
    }
    this.jwtIssuance = (data): string => {
      return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: process.env.SESSION_TIMEOUT })
    }
  }
}
