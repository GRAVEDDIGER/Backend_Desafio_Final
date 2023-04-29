import { type Response, Router, type Request } from 'express'
import passport from 'passport'

import { AuthController } from './auth.controller'
import { sendMail } from '../nodemailer/nodemailer.service'

export const authRoutes = Router()
const authController = new AuthController()
/*
* LOGIN ROUTES
*/
authRoutes.post('/login',
  passport.authenticate('login', { failureRedirect: '/auth/loginfailed' }),
  authController.jwtIssuance,
  (req: Request, res: Response) => {
    res.render('showproducts')
  })

authRoutes.get('/login', (req: Request, res: Response) => {
  res.render('login')
})
authRoutes.get('/loginfailed', (req: Request, res: Response) => {
  const message = req.flash()
  console.log(message)
  res.render('login', { isError: true, message })
})
/*
* SIGN UP ROUTES
*/
authRoutes.post('/signup', passport.authenticate('register'), authController.jwtIssuance, (req: Request, res: Response) => {
  if ('user' in req && req.user !== undefined && 'username' in req.user && req.user.username !== undefined && req.user.username !== null) { sendMail('User created', `User ${req.user.username as string}`) }
  console.log('registred', req.isAuthenticated())
  res.status(201).send('Autorized')
})
authRoutes.get('/signup', (req: Request, res: Response) => {
  res.render('register')
})
