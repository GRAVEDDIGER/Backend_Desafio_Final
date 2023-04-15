import { Request, Response } from "express"
import { CreateUsersDto } from "./entities"
import { UsersService, usersService } from "./users.service"
import { logger } from "../logger/logger.service"
import { IRequest } from "passport-fast-config"
class UserController {
private static Instance:any
    constructor(
        private readonly userObject =new CreateUsersDto(" "," "," ",0,{street:" ",number:0,city:" ",zipCode:" "}," "),
        private readonly usersService = new UsersService(),
        public createUser=async (req:Request,res:Response)=>{
            let response:any
            if ("body" in req && req.body !==null) { 
                const bodyLocal =req.body
                let userObject:CreateUsersDto =this.userObject
                Object.keys(userObject).forEach((field:string)=>{
                    if (field in bodyLocal) userObject={...userObject,[field]:bodyLocal[field as keyof CreateUsersDto]}
                })
                try{
                response = await usersService.create(userObject)
            }catch(error){logger.error({function:"UserController.create",error})}
               if("ok" in response && response.ok) res.status(200).send(response)
               else  res.status(400).send(response)
 
        }
        },
        public updateUser=async (req:Request,res:Response)=>{
            let response:any
            const {id}=req.params
            try{
                const updateObject =req.body
                console.log(id)
                delete updateObject?.password
                response =await this.usersService.update(req.body,id)
                if (response.ok) res.status(200).send(response)
                else             res.status(400).send(response)

            }
            catch(error){
                logger.error({function:"UserController.updateUser",error})
                
            }
        },
        public findUserById=async (req:Request,res:Response)=>{
            const {id}=req.params
            let response:any
            try{
                response =await this.usersService.findById(id)
                logger.debug({function:"UserController.findById",response})
                if (response.ok) res.status(200).send(response)
                else res.status(400).send(response)
            }
            catch(error){
                logger.error({function:"UserController.findUserById",error})
            }
        },
        public listUsers=async (_req:Request,res:Response)=>{
            let response :any
            try{
                response=await this.usersService.listUsers()
                if (response.ok) res.status(200).send(response)
                else res.status(400).send(response)
            }catch(error){
                logger.error({function:"UserController.listUsers",error})
            }
        },
        public deleteUser=async (req:Request,res:Response)=>{
            let response:any
            const {id}= req.params
            try{
                response=await this.usersService.deleteUser(id)
                logger.debug({function:"UserController.deleteUser",response})
                if (response.ok) res.status(200).send(response)
                else res.status(400).send(response)
            }catch(error){
                logger.error({function:"UserController.deleteUser",error})
            }

        }
     
    ){
        if (UserController.Instance !== undefined){
            return UserController.Instance
        }
        UserController.Instance=this
        return this
    }
}
export const  userController = new UserController()