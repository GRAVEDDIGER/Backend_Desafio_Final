import { PrismaClient, Prisma } from '@prisma/client';
import { CreateUsersDto } from './entities';
import { IResponse } from '..';
import { logger } from '../logger/logger.service';
// Creo los servicios con un patron singleton para evitar la instanciacion multiple de los mismos 

export class UsersService {
   public static Instance:any
    constructor (
        private prisma=new PrismaClient().users,
        public  create=async(createUserDto:CreateUsersDto):Promise<IResponse>=>{
            try {
            const response=await this.prisma.create({data:{...createUserDto}})
            logger.error({level:"debug",function:"UsersService.create()",response})
            return {error:null,ok:false,response}
        }catch(error){
            logger.error({level:"error",function:"UsersService.create()",error})
            return {error,ok:false,response:null}
            
        }
        },
        public update=async(updateUserDto :CreateUsersDto,id:string):Promise<any>=>{
            try {
                const response=await this.prisma.update({
                    where:{id},
                    data:{...updateUserDto}
                })
                logger.error({level:"debug",function:"UsersService.update()",response})
                return {error:null,ok:false,response}
            }catch(error){
                logger.error({level:"error",function:"UsersService.update()",error})
                return {error,ok:false,response:null}
                
            }

        },
        public findById=async (id:string) : Promise<IResponse> =>{
            try{
                const response = await this.prisma.findUnique({where:{id:id}})
                return {error:null,ok:false,response}
            }catch(error){
                logger.error({level:"error",function:"UsersService.findById",error})
                return {error,ok:false,response:null}

        }
        },
        public findByUsername=async(username:string):Promise<IResponse>=>{
            try{
                const response = await this.prisma.findUnique({where: {username}})
                return {error:null,ok:false,response}

            }catch(error)
            {
                logger.error({level:"error",function:"UsersService.findByUsername",error})
                return {error,ok:false,response:null}

            }
        },
        public listUsers=async () =>{
            try{
                const response = await this.prisma.findMany()
                return {error:null,ok:false,response}

            }catch(error){
                logger.error({level:"error",function:"UsersService.listUsers",error})
                return {error,ok:false,response:null}

            }
        },
        public deleteUser =async (id:string):Promise<IResponse>=>{
            try {
                const response =await this.prisma.delete({where: {id:id}})
                return {error:null,ok:false,response}

            }catch(error){
                logger.error({level:"error",function:"UsersService.deleteUser",error})
                return {error,ok:false,response:null}
            }
        }


    ){
        if (UsersService.Instance===undefined){
            UsersService.Instance=this
            return UsersService.Instance
        }else return UsersService.Instance
    }
}
export const usersService =new UsersService()
