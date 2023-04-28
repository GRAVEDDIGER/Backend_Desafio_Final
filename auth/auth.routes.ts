import { Response, Router, Request } from 'express'
import passport from 'passport'
import { AuthController } from './auth.controller'
export const authRoutes = Router()
const authController = new AuthController()
authRoutes.post('/login', passport.authenticate('login'), authController.jwtIssuance, (req: Request, res: Response) => {
  console.log('login ')
  console.log(req.user)
})
authRoutes.post('/signup', passport.authenticate('register'), authController.jwtIssuance, (req: Request, res: Response) => {
  console.log('registred', req.isAuthenticated)
})
