import sendResponse from "./sendResponse";
import { Response } from "express";



const checkOptExpiration =(res:Response,otpGeneratedTime:string,thresholdTime:number)=>{
    const currentTime=Date.now()
    if(currentTime-parseInt(otpGeneratedTime)<=thresholdTime){
        //opt expired vako chaina vane
        sendResponse(res,200,"Valid OTP, now you can reset your password");
      }
      else{
        sendResponse(res,400,"OTP expired");
      }
}

export default checkOptExpiration