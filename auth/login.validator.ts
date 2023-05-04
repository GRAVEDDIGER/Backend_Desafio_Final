import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
export const loginValidation = [
  body('username').notEmpty().withMessage('Cant be a empty String').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Please enter a valid password'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      req.flash('errors', '')
      return next()
    } else {
      const data: any[] = errors.array()
      req.flash('errors', data)
      res.send({ ok: false, url: '/auth/loginfailed' })
    }
  }

]
