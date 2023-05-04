import { type NextFunction, type Request, type Response } from 'express'
import { AuthService } from './auth.service'
import passport from 'passport'

export class AuthController {
  constructor (
    private readonly service = new AuthService(),
    public errorHandler = (req: Request, res: Response) => {
      const errors = req.flash('errors')
      res.render('signuperror', { errors })
    },
    public routeGuard = (req: Request, res: Response, next: NextFunction) => {
      const bool: boolean = req.isAuthenticated()
      if (bool) next()
      else res.status(401).redirect('/auth/login')
    },
    public jwtGuard = passport.authenticate('jwt', { failureRedirect: '/auth/login', failureFlash: true, session: false }),
    public jwtIssuance = (req: Request, res: Response, next: NextFunction) => {
      if (req.user !== undefined) {
        console.log(req.user)
        if ('id' in req.user) {
          console.log(req.user.id)
          res.cookie('jwt', this.service.jwtIssuance({ sub: req.user.id }), { httpOnly: true })
          console.log('JWT Issued')
          res.redirect('/products')
        }
      } else {
        res.redirect('/auth/login')
        return { message: 'not Authorized' }
      }
      next()
    }
  ) {

  }
}
