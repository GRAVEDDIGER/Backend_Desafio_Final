import { Request, Response } from "express"
import { CreateUsersDto } from "./entities"
import { usersService } from "./users.service"
class UserController {
private static Instance:any
    constructor(
        private readonly userObject =new CreateUsersDto(" "," "," ",0,{street:" ",number:0,city:" ",zipCode:" "}," "),
        public createUser=async (req:Request,res:Response)=>{
            if ("body" in req && req.body !==null&&req.body instanceof CreateUsersDto) { 
                const bodyLocal =req.body
                let userObject:CreateUsersDto =this.userObject
                Object.keys(userObject).forEach((field:string)=>{
                    if (field in bodyLocal) userObject={...userObject,[field]:bodyLocal[field as keyof CreateUsersDto]}
                })
                const response = await usersService.create(userObject)
                if("ok" in response && response.ok) res.status(200).send(response)
                else res.status(400).send(response)
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