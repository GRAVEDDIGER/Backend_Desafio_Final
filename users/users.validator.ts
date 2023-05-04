import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
export const userValidation = [
  body('username').notEmpty().withMessage('Cant be a empty String').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Please enter a valid password'),
  body('name').notEmpty().withMessage('Must provide a name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('lastName').notEmpty().withMessage('Must provide a name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
  body('phoneNumber').notEmpty().withMessage('Must provide a phone number').isLength({ min: 10 }).withMessage('phoneNumber should be at least 10 caracters long ').isString(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    else {
      const data: any[] = errors.array()
      req.flash('errors', data)
      res.redirect('/auth/signupfailed')
    }
  }

]
