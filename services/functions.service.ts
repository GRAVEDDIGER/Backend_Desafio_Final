import { Prisma, PrismaClient, ModelName, GlobalReject } from '@prisma/client'
import {
  CreateCartDto,
  CreateProductDto,
  CreateUsersDto,
  ResponseObject
} from '../entities'
import { IResponse } from '../index'
import { logger } from '../logger/logger.service'
import { PrismaClientOptions } from '@prisma/client/runtime'
class DtoContainer {
  carts = CreateCartDto
  products = CreateProductDto
  users = CreateUsersDto
}
const dtoContainer = new DtoContainer()

const prismaObject = new PrismaClient()
type cosito = ModelName['carts']

type ModelsType = Omit<
  typeof prismaObject,
| '$connect'
| '$disconnect'
| '$on'
| '$runCommandRaw'
| '$transaction'
| '$use'
| 'messages'
| 'sales'
>
type GenericModel<T extends keyof ModelsType> = ModelsType[T]
type Dto<T extends keyof ModelsType> = ModelsType[T] extends {
  create: (args: { data: infer U }) => any
}
  ? U
  : never
// type GenericDto<T extends 'carts' | 'users' | 'products'> =
// T extends 'carts'
//   ? CreateCartDto
//   : T extends 'users'
//     ? CreateUsersDto
//     : T extends 'products'
//       ? CreateProductDto
//       : null
export abstract class GenericService<T extends keyof ModelsType> {
  static Instance: any
  private readonly model: T
  private readonly prisma: GenericModel<T>
  constructor (model: T) {
    this.model = model
    this.prisma = new PrismaClient()[this.model]
  }
}
function validateDto (dto: any): keyof ModelsType | false {
  Object.keys(dtoContainer).forEach((field: string) => {
    if (dto instanceof dtoContainer[field as keyof DtoContainer]) return field
  })
  return false
}
function validateModel (prisma: any): keyof ModelsType | false {
  Object.keys(prismaObject).forEach((field: string) => {
    if (field in dtoContainer) {
      if (prismaObject[field as keyof PrismaClient] instanceof prisma) { return field }
    }
  })
  return false
}
type alfa<T extends keyof ModelsType> = ModelsType[T] extends {
  create: (data: infer U) => any
}
  ? U
  : never
type coso<T extends keyof ModelsType> = alfa<T> extends { data: infer U }
  ? U
  : never
// coso<'carts'>
function mixedValidation<T extends keyof ModelsType> (
  prisma: any,
  dto: any
): coso<T> {
  const modelValidated = validateModel(prisma)
  const dtoValidated = validateDto(dto)
  if (modelValidated !== false && dtoValidated !== false) {
    if (modelValidated === dtoValidated) {
      const data: coso<T> = dto
      return data
    }
  }
  throw new Error('Wrong types')
}
let cc: Dto<'carts'>
let v: PrismaClient<PrismaClientOptions>
const dd = prismaObject.carts.create({ data: { ...cc } })
// type createMethodFn<T extends keyof ModelsType> = (prisma: PrismaClient, model: T, dto: Dto<T>) => unknown
async function createMethodFn<T extends CreateCartDto | CreateProductDto | CreateUsersDto> (prisma: PrismaClient, model: keyof ModelsType, dto: T): any {
  const response = await prisma[model].create({ data: dto })
  return response
}
// export async function createMethod<T extends keyof ModelsType> (

//   model: T,
//   dtoSource: Dto<T>,
//   prismaSource: typeof prismaObject = prismaObject
// ): Promise<IResponse> {
//   let response: any
//   const prisma = prismaObject[model]
//   const dto: Dto<T> = dtoSource
//   try {
//     if (dto instanceof dtoContainer[model]) {
//       response = await prisma.create({
//         data: dto /* mixedValidation(prisma, dto) */
//       })
//       return new ResponseObject(null, true, response)
//     } else {
//       return new ResponseObject(
//         'Data provided doesnt Match DTOS signatures',
//         false,
//         null
//       )
//     }
//   } catch (error: any) {
//     logger.error({
//       function: `create_${model}_service`,
//       error
//     })
//     return new ResponseObject(error, false, null)
//   }
// }
