import { NextFunction, Request, Response } from 'express'
import { AuthService } from './auth.service'

export class AuthController {
  constructor (
    private readonly service = new AuthService(),
    public routeGuard = (req: Request, res: Response, next: NextFunction) => {
      if (req.isAuthenticated()) next()
      else res.status(401).redirect('/auth/login')
    },
    public jwtIssuance = (req: Request, res: Response, next: NextFunction) => {
      if (req.user !== undefined) {
        if ('id' in req.user) {
          console.log(req.user.id)
          res.send(this.service.jwtIssuance({ sub: req.user.id }))
        }
      } else res.redirect('/auth/login')
      next()
    }
  ) {

  }
}
