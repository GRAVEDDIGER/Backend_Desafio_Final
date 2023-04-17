import { Request, Response } from 'express'
import { CreateUsersDto } from './entities'
import { UsersService } from './users.service'
import { logger } from '../logger/logger.service'
import { IResponse } from '../index'
class UserController {
  private static Instance: any
  constructor (
    private readonly userObject = new CreateUsersDto(
      ' ',
      ' ',
      ' ',
      0,
      { street: ' ', number: 0, city: ' ', zipCode: ' ' },
      ' '
    ),
    private readonly usersService = new UsersService(),
    public createUser = (req: Request, res: Response) => {
      if ('body' in req && req.body !== null) {
        const bodyLocal = req.body
        let userObject: CreateUsersDto = this.userObject
        Object.keys(userObject).forEach((field: string) => {
          if (field in bodyLocal) {
            userObject = {
              ...userObject,
              [field]: bodyLocal[field as keyof CreateUsersDto]
            }
          }
        })
        this.usersService.create(userObject)
          .then((response: IResponse) => {
            if ('ok' in response && response.ok) res.status(200).send(response)
            else res.status(400).send(response)
          }).catch((error: any) => {
            logger.error({
              function: 'UserController.create',
              error
            })
          })
      }
    },
    public updateUser = (req: Request, res: Response) => {
      let response: any
      const { id } = req.params
      const updateObject = req.body
      console.log(id)
      delete updateObject?.password
      this.usersService.update(req.body, id)
        .then(
          (response: IResponse) => {
            if ('ok' in response && response.ok) res.status(200).send(response)
            else res.status(400).send(response)
          }
        ).catch((error: any) => {
          logger.error({ function: 'UserController.updateUser', error })
          res.status(400).send(response)
        })
    },
    public findUserById = (req: Request, res: Response) => {
      const { id } = req.params
      let response: any
      this.usersService.findById(id)
        .then((response: IResponse) => {
          logger.debug({ function: 'UserController.findById', response })
          if (response.ok) res.status(200).send(response)
          else res.status(400).send(response)
        }).catch((error: any) => {
          logger.error({ function: 'UserController.findUserById', error })
          res.status(400).send(response)
        })
    },
    public listUsers = (_req: Request, res: Response) => {
      this.usersService.listUsers()
        .then((response: IResponse) => {
          if (response.ok) res.status(200).send(response)
          else res.status(400).send(response)
        }).catch((error: any) => {
          logger.error({ function: 'UserController.listUsers', error })
          res.status(400).send(error)
        })
    },
    public deleteUser = (req: Request, res: Response) => {
      const { id } = req.params
      this.usersService.deleteUser(id)
        .then((response: IResponse) => {
          logger.debug({ function: 'UserController.deleteUser', response })
          if (response.ok) res.status(200).send(response)
          else res.status(400).send(response)
        })
        .catch((error: any) => {
          logger.error({ function: 'UserController.deleteUser', error })
          res.status(400).send(error)
        })
    }
  ) {
    if (UserController.Instance !== undefined) {
      return UserController.Instance
    }
    UserController.Instance = this
    return this
  }
}
export const userController = new UserController()
