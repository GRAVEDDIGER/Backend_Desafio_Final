import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
export const productValidation = [
  body('name').isString().notEmpty().withMessage('Should be a not Empty String'),
  body('description').isString().notEmpty().withMessage('Should be a not Empty String'),
  body('category').isString().notEmpty().withMessage('Should be a not Empty String'),
  body('url').isString().notEmpty().isURL().withMessage('Should be a not Empty Link'),
  body('stock').isInt().notEmpty().withMessage('Should be a not Empty Int'),
  body('price').isInt().notEmpty().withMessage('Should be a not Empty Int'),
  body('rate').isInt().notEmpty().withMessage('Should be a not Empty Int'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) return next()
    else {
      const data: any[] = errors.array()
      req.flash('errors', data)
      res.send({ ok: false, url: '/products/addfailed' })
    }
  }

]
