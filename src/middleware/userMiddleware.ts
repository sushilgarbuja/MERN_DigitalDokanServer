import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config";
class userMiddleware{
    async isUserLoggedIn(req: Request, res: Response, next: NextFunction): Promise<void> {
        //receive
        const token = req.headers.authorization
        if(!token){
            res.status(401).json({ message: "Please provide a token" });
            return;
        }
        //validate 
        jwt.verify(token,envConfig.jwtSecret as string, async (err,result)=>{
            if(err){
                res.status(401).json({ message: "Invalid token" });
                
            }else{
                console.log(result);
                next()
            }
            // next()
        })
       
    }
}
export default new userMiddleware