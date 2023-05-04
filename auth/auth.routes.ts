import { type Response, Router, type Request } from 'express'
import passport from 'passport'
import { AuthController } from './auth.controller'
import { userValidation } from '../users/users.validator'
import { loginValidation } from './login.validator'
export const authRoutes = Router()
const authController = new AuthController()
/*
* LOGIN ROUTES
*/
authRoutes.post('/login', loginValidation,
  passport.authenticate('login', { failureRedirect: '/auth/loginfailed' }),
  authController.jwtIssuance,
  (_req: Request, _res: Response) => {
    console.log('post done')
  })

authRoutes.get('/login', (req: Request, res: Response) => {
  console.log(req.cookies)
  res.render('login')
})
authRoutes.get('/loginfailed', (req: Request, res: Response) => {
  const errors = req.flash()
  console.log(errors, errors.length, req.flash())
  if ('errors' in errors) {
    res.render('loginvalidationerror', { errors: errors.errors })
  } else {
    res.render('login', { isError: true, message: errors.error })
  }
})
// if (errors.length === 0) res.render('loginvalidationerror', { errors })
// else {
//   const message = req.flash('error')
//   console.log(message)
//   res.render('login', { isError: true, message })
// }

/*
* SIGN UP ROUTES
*/
authRoutes.post('/signup', userValidation, passport.authenticate('register'), authController.jwtIssuance)
authRoutes.get('/signup', (_req: Request, res: Response) => {
  res.render('register')
})
authRoutes.get('/signupfailed', authController.errorHandler)
/*
* Logout
*/
authRoutes.get('/logout', (_req: Request, res: Response) => {
  res.clearCookie('jwt')
  res.redirect('/auth/login')
})
