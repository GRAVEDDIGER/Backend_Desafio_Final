import passport from 'passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'
const LocalStrategy = Strategy
const authService = new AuthService()
passport.use('login', new LocalStrategy(authService.verifyLocalLogin))
passport.use('register', new LocalStrategy({ passReqToCallback: true }, authService.signUpLocal))
passport.serializeUser(authService.serialize)
passport.deserializeUser(authService.deSerialize)

export default passport
