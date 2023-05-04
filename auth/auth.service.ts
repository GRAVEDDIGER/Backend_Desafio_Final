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
          } else done(null, false, { message: `Password doesnt match with user:${username}` })
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
                    return done(null, response)
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

    this.serialize = (user, done) => {
      if ('id' in user) done(null, user.id)
    }
    this.deSerialize = (id, done) => {
      this.prisma.users.findUnique({ where: { id } }).then((user: any) => done(null, user)).catch((error: any) => done(error))
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    this.verifyJwt = (jwt_payload: string, done: (error: any, user?: any, message?: any) => any) => {
      logger.debug({ function: 'AuthService.Verifyjwt', jwt_payload })
      const id = jwt_payload.sub as unknown as string
      this.prisma.users.findUnique({ where: { id } })
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
      return jwt.sign(data, privateKey, { algorithm: 'RS256', expiresIn: process.env.JWT_TIMEOUT })
    }
  }
}
