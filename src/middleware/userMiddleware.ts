import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
import User from "../database/models/userModel";
export enum Role{
    admin="admin",
    customer="customer"
}
interface IExtendedRequest extends Request {
    user?:{
        username:string,
        email:string,
        role:string,
        id:string,
        password:string
    }
}
class userMiddleware{
    async isUserLoggedIn(req: IExtendedRequest, res: Response, next: NextFunction): Promise<void> {
        //receive
        const token = req.headers.authorization
        if(!token){
            res.status(401).json({ message: "Please provide a token" });
            return;
        }
        //validate 
        jwt.verify(token,envConfig.jwtSecret as string, async (err,result:any)=>{
            if(err){
                res.status(401).json({ message: "Invalid token" });
                
            }else{
                console.log(result);
                const userData= await User.findByPk(result?.userId) //{email}
                if(!userData){
                    res.status(401).json({ message: "User not found" });
                    return
                }
                req.user=userData
                next()
            }
        })
       
    }
    restrictTo(...roles:Role[]){
        return (req:IExtendedRequest, res:Response, next:NextFunction)=>{
            let userRole = req.user?.role as Role
            console.log(userRole,"Role");
            if(!roles.includes(userRole)){
                res.status(403).json({ message: "You are not authorized to perform this action" });
                return
            }
            next()
        }

    }
}

export default new userMiddleware