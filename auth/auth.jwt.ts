import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import fs from 'fs'
const publicKey = fs.readFileSync('./public_key.pem')

const authService = new AuthService()
const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: publicKey
}
passport.use('jwt', new Strategy(opt, authService.verifyJwt))
