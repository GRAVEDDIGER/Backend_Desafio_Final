import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../logger/logger.service'
import { ResponseObject } from '../entities'
import { IResponse } from '../index'

type Dto<T extends Lowercase<Prisma.ModelName>> = PrismaClient[T] extends { create: (args: { data: infer U }) => Promise<unknown> } ? U : never
type ModelNames = Prisma.ModelName
type functionType<T extends ModelNames> = (dto: Dto<T>, client: PrismaClient, model: T) => Promise<IResponse>

export function CreateFunctions (): any {
  const createCarts: functionType<'carts'> = async (dto, client, model = 'carts'): Promise<IResponse> => {
    let response
    if (model === 'carts') {
      try {
        response = await client[model].create({ data: dto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'createCarts',
          error
        })
        return new ResponseObject(error, false, null)
      }
    } else throw new Error('Type missmatch')
  }

  const createUsers: functionType<'users'> = async (dto, client, model = 'users'): Promise<IResponse> => {
    let response
    if (model === 'users') {
      try {
        response = await client[model].create({ data: dto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'createCarts',
          error
        })
        return new ResponseObject(error, false, null)
      }
    } else throw new Error('Type missmatch')
  }
  const createProducts: functionType<'products'> = async (dto, client, model = 'products'): Promise<IResponse> => {
    let response
    if (model === 'products') {
      try {
        response = await client[model].create({ data: dto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'createCarts',
          error
        })
        return new ResponseObject(error, false, null)
      }
    } else throw new Error('Type missmatch')
  }
  const createSales: functionType<'sales'> = async (dto, client, model = 'sales'): Promise<IResponse> => {
    let response
    if (model === 'sales') {
      try {
        response = await client[model].create({ data: dto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'createCarts',
          error
        })
        return new ResponseObject(error, false, null)
      }
    } else throw new Error('Type missmatch')
  }
  const createMessages: functionType<'messages'> = async (dto, client, model = 'messages'): Promise<IResponse> => {
    let response
    if (model === 'messages') {
      try {
        response = await client[model].create({ data: dto })
        return new ResponseObject(null, true, response)
      } catch (error: any) {
        logger.error({
          function: 'createCarts',
          error
        })
        return new ResponseObject(error, false, null)
      }
    } else throw new Error('Type missmatch')
  }
  return { createCarts, createUsers, createProducts, createSales, createMessages }
}
type updateFunction <T extends ModelNames> = (id: string, dto: Dto<T>, client: PrismaClient, model: T) => Promise<IResponse>
export const UpdateFunctions = (): any => {
  const updateCart: updateFunction<'carts'> = async (id: string, dto, client, model = 'carts'): Promise<IResponse> => {
    if (model === 'carts') {
      let response: any
      try {
        response = await client[model].update({ where: { id }, data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'updateCart',
          error
        })
        return new ResponseObject(error, true, null)
      }
    } else {
      const error = new Error('Type Missmatch')
      return new ResponseObject(error, false, null)
    }
  }
  const updateProducts: updateFunction<'products'> = async (id: string, dto, client, model = 'products'): Promise<IResponse> => {
    if (model === 'products') {
      let response: any
      try {
        response = await client[model].update({ where: { id }, data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'updateCart',
          error
        })
        return new ResponseObject(error, true, null)
      }
    } else {
      return new ResponseObject(new Error('Type Missmatch'), false, null)
    }
  }
  const updateUsers: updateFunction<'users'> = async (id: string, dto, client, model = 'users'): Promise<IResponse> => {
    if (model === 'users') {
      let response: any
      try {
        response = await client[model].update({ where: { id }, data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'updateCart',
          error
        })
        return new ResponseObject(error, true, null)
      }
    } else return new ResponseObject(new Error('Type Missmatch'), false, null)
  }
  const updateSales: updateFunction<'sales'> = async (id: string, dto, client, model = 'sales') => {
    if (model === 'sales') {
      let response: any
      try {
        response = await client[model].update({ where: { id }, data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'updateCart',
          error
        })
        return new ResponseObject(error, true, null)
      }
    } else return new ResponseObject(new Error('Type Missmatch'), false, null)
  }
  const updateMessages: updateFunction<'messages'> = async (id: string, dto, client, model = 'messages') => {
    if (model === 'messages') {
      let response: any
      try {
        response = await client[model].update({ where: { id }, data: dto })
        return new ResponseObject(null, true, response)
      } catch (error) {
        logger.error({
          function: 'updateCart',
          error
        })
        return new ResponseObject(error, true, null)
      }
    } else return new ResponseObject(new Error('Type Missmatch'), false, null)
  }
  return { updateCart, updateProducts, updateUsers, updateSales, updateMessages }
}

/*
CLOUSURE FUNCTION FOR LIST FUNCTIONS

*/
export type ListClousure = (model: ModelNames, client: PrismaClient) => any
export type listFunction = () => Promise<IResponse>
export const ListFunction: ListClousure = (modelOut, client): any => {
  const listCarts: listFunction = async (): Promise<IResponse> => {
    const model = modelOut as 'carts'
    let response: any
    try {
      if (model === 'carts') {
        response = await client[model].findMany()
        return new ResponseObject(null, true, response)
      } else return new ResponseObject(new Error('Type Missmatch'), false, null)
    } catch (error) {
      logger.error({ function: 'listCarts', error })
      return new ResponseObject(error, false, null)
    }
  }
  const listProducts: listFunction<'products'> = async (model, client): Promise<IResponse> => {
    let response: any
    try {
      if (model === 'products') {
        response = await client[model].findMany()
        return new ResponseObject(null, true, response)
      } else return new ResponseObject(new Error('Type Missmatch'), false, null)
    } catch (error) {
      logger.error({ function: 'listProducts', error })
      return new ResponseObject(error, false, null)
    }
  }
  const listUsers: listFunction<'users'> = async (model, client): Promise<IResponse> => {
    let response: any
    try {
      if (model === 'users') {
        response = await client[model].findMany()
        return new ResponseObject(null, true, response)
      } else return new ResponseObject(new Error('Type Missmatch'), false, null)
    } catch (error) {
      logger.error({ function: 'listUsers', error })
      return new ResponseObject(error, false, null)
    }
  }
  const listSales: listFunction<'sales'> = async (model, client): Promise<IResponse> => {
    let response: any
    try {
      if (model === 'sales') {
        response = await client[model].findMany()
        return new ResponseObject(null, true, response)
      } else return new ResponseObject(new Error('Type Missmatch'), false, null)
    } catch (error) {
      logger.error({ function: 'listSales', error })
      return new ResponseObject(error, false, null)
    }
  }
  const listMessages: listFunction<'messages'> = async (model, client): Promise<IResponse> => {
    let response: any
    try {
      if (model === 'messages') {
        response = await client[model].findMany()
        return new ResponseObject(null, true, response)
      } else return new ResponseObject(new Error('Type Missmatch'), false, null)
    } catch (error) {
      logger.error({ function: 'listMessages', error })
      return new ResponseObject(error, false, null)
    }
  }
  return { listCarts, listProducts, listUsers, listSales, listMessages }
}

type GetByIdFunction <T extends ModelNames> = (model: T, client: PrismaClient, id: string) => Promise<IResponse>
export const getByIdFunctions = (): any => {
  const getCartById: GetByIdFunction<'carts'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].findUnique({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'getCartById', error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const getProductsById: GetByIdFunction<'products'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].findUnique({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'getProductsyId', error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const getUsersById: GetByIdFunction<'users'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].findUnique({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'getUsersById', error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const getSalesById: GetByIdFunction<'sales'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].findUnique({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'getSalesById', error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const getMessagesById: GetByIdFunction<'messages'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].findUnique({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'getMessagesById', error
      })
      return new ResponseObject(error, false, null)
    }
  }
  return { getCartById, getProductsById, getUsersById, getSalesById, getMessagesById }
}

type DeleteFunction <T extends ModelNames> = (model: T, client: PrismaClient, id: string) => Promise<IResponse>

export const DeleteFunctions = (): any => {
  const deleteCart: DeleteFunction<'carts'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].delete({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'deleteCart',
        error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const deleteProduct: DeleteFunction<'products'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].delete({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'deleteProducts',
        error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const deleteUser: DeleteFunction<'users'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].delete({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'deleteUser',
        error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const deleteSale: DeleteFunction<'sales'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].delete({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'deleteSale',
        error
      })
      return new ResponseObject(error, false, null)
    }
  }
  const deleteMessage: DeleteFunction<'messages'> = async (model, client, id): Promise<IResponse> => {
    let response: any
    try {
      response = await client[model].delete({ where: { id } })
      return new ResponseObject(null, true, response)
    } catch (error) {
      logger.error({
        function: 'deleteMessage',
        error
      })
      return new ResponseObject(error, false, null)
    }
  }
  return { deleteCart, deleteProduct, deleteUser, deleteSale, deleteMessage }
}
