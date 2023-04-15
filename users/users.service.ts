import { PrismaClient, Prisma } from '@prisma/client';
import { CreateUsersDto } from './entities';
import { IResponse } from '../index';
import { logger } from '../logger/logger.service';
// Creo los servicios con un patron singleton para evitar la instanciacion multiple de los mismos 

export class UsersService {
   public static Instance:any
    constructor (
        private prisma=new PrismaClient().users,
        public  create=async(createUserDto:CreateUsersDto):Promise<IResponse>=>{
            if ("password"in createUserDto) delete createUserDto?.password;
            try {
            const response=await this.prisma.create({data:{...createUserDto}})
            return {error:null,ok:true,response}
        }catch(error:any)
        {
            logger.error({level:"error",function:"UsersService.create()",error})
           
            return {error,ok:false,response:(error?.code !== undefined &&error?.code==="P2002")? "Duplicated Key Error":null}
        }
        },
        public update=async(updateUserDto :CreateUsersDto,id:string):Promise<any>=>{
            try {
                const response=await this.prisma.update({
                    where:{id},
                    data:{...updateUserDto}
                })
                return {error:null,ok:true,response}
            }catch(error:any){
                logger.error({level:"error",function:"UsersService.update()",error})
                return {error,ok:false,response:(error?.code !== undefined &&error?.code==="P2025")? "Id not found":null}
                
            }

        },
        public findById=async (id:string) : Promise<IResponse> =>{
            try{
                const response = await this.prisma.findUnique({where:{id:id}})
                if (response ===null) return {error:"Id Doesnt exists!",ok:false,response:null}
                return {error:null,ok:true,response}
            }catch(error){
                logger.error({level:"error",function:"UsersService.findById",error})
                return {error,ok:false,response:null}

        }
        },
        public findByUsername=async(username:string):Promise<IResponse>=>{
            try{
                const response = await this.prisma.findUnique({where: {username}})
                if (response ===null) return {error:"Id Doesnt exists!",ok:false,response:null}
                return {error:null,ok:true,response}

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
                return {error:null,ok:true,response}

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
