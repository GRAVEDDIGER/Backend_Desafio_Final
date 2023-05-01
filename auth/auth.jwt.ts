import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { Request } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
const publicKey = fs.readFileSync('./auth/id_rsa_pub.pem', 'utf-8')
const keyExtractor = (req: Request): any => {
  let token: string = ''

  if (req.cookies !== undefined && req.cookies !== null) {
    if (req.cookies.jwt !== undefined && req.cookies.jwt !== null) token = req.cookies.jwt as string
  }

  const verify = jwt.verify(token, publicKey)
  console.log('jwt: ', token, verify)
  return token
}
const authService = new AuthService()
const opt = {
  jwtFromRequest: ExtractJwt.fromExtractors([keyExtractor]),
  secretOrKey: publicKey,
  algorithms: ['RS256']
}
console.log(opt)

passport.use('jwt', new Strategy(opt, authService.verifyJwt))
