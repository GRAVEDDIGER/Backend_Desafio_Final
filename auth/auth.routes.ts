import { type Response, Router, type Request } from 'express'
import passport from 'passport'
import { AuthController } from './auth.controller'
export const authRoutes = Router()
const authController = new AuthController()
authRoutes.post('/login', passport.authenticate('login', { failureRedirect: '/auth/loginfailed' }), authController.jwtIssuance, (req: Request, res: Response) => {
  res.status(300).redirect('/products')
})
authRoutes.get('/login', (req: Request, res: Response) => {
  res.render('login')
})
authRoutes.get('/loginfailed', (req: Request, res: Response) => {
  const message = req.flash()
  res.render('login', { isError: true, message })
})
authRoutes.post('/signup', passport.authenticate('register'), authController.jwtIssuance, (req: Request, res: Response) => {
  console.log('registred', req.isAuthenticated)
})
