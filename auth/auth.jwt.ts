import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { Request } from 'express'
import fs from 'fs'
const publicKey = fs.readFileSync('./auth/id_rsa_pub.pem', 'utf-8')
const keyExtractor = (req: Request): any => {
  let token: string = ''

  if (req.cookies !== undefined && req.cookies !== null) {
    if (req.cookies.jwt !== undefined && req.cookies.jwt !== null) token = req.cookies.jwt as string
  }
  return token
}
const authService = new AuthService()
const opt = {
  jwtFromRequest: ExtractJwt.fromExtractors([keyExtractor]),
  secretOrKey: publicKey,
  algorithms: ['RS256']
}

passport.use('jwt', new Strategy(opt, authService.verifyJwt))
