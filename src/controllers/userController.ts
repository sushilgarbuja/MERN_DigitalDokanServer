import { Request, Response } from 'express';
import User from '../database/models/userModel';
import generateToken from '../services/generateToken';
import bcrypt from 'bcrypt';
import generateOtp from '../services/generateOtp';
import sendMail from '../services/sendMail';
import findData from '../services/findData';
import sendResponse from '../services/sendResponse';
import checkOptExpiration from '../services/checkOtpExpiration';

class AuthController {
    public static async UserRegister(req: Request, res: Response): Promise<void> {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
        //check if user already exists
        const [data]= await User.findAll({
        where:{
            email:email
        }
    })
    if(data){
        res.status(400).json({ message: "User already exists" });
        return;
    }

     const user =   await User.create({
             email,
             username,
             password: bcrypt.hashSync(password, 10),
             });

        await sendMail({
            to: email,
            subject: "Account Created",
            text: `Your account has been created successfully`
        })     
        res.status(200).json({ message: "User created successfully",
            // data:user
         });
    }

    public static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
    
        const users = await User.findAll({
            where: {
                email: email
            }
        });
    
        if (users.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        } else {
            const user = users[0];
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password" });
                return;
            } else {
                // Assuming generateToken requires userId, secretKey, and expiresIn
                const secretKey = 'your-secret-key'; // Replace with your actual secret key
                const expiresIn = '1h'; // Replace with your desired expiration time
                const token = generateToken(user.id, secretKey, expiresIn);
                res.status(200).json({ message: "Login successful", token });
            }
        }
    }

    public static async forgotPassword(req: Request, res: Response): Promise<void> {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Please provide an email" });
            return;
        }
        const users = await User.findAll({
            where: {
                email: email
            }
        });
        if (users.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        } else {
            const otp = generateOtp();
            await sendMail({
                to: email,
                subject: "Password Reset OTP",
                text: `Your OTP is ${otp}`
            });
            users[0].otp = otp.toString();
            users[0].otpGeneratedTime = new Date().toString();
            await users[0].save();

            res.status(200).json({ message: "OTP sent successfully" });
        }
    }

    public static async verigyOtp(req: Request, res: Response) {
        const { otp, email } = req.body;
        if (!otp || !email) {
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
        const user = await findData(User, email);
        if (!user) {
            sendResponse(res, 404, "User not found");
            return;
        }
        //otp verification
       const [data]= await User.findAll({
        where:{
            otp,
            email
        }
       })
       if(!data){
        sendResponse(res, 400, "Invalid OTP");
        return;
       }
      const otpGeneratedTime=data.otpGeneratedTime;
      checkOptExpiration(res,otpGeneratedTime,120000);
    }
public static async resetPassword(req:Request,res:Response){
    const {newPassword,confirmPassword,email,otp}=req.body
    if(!newPassword || !confirmPassword || !email || !otp){
        sendResponse(res,400,"Please provide all fields")
        return
    }
    if(newPassword!==confirmPassword){
        sendResponse(res,400,"New password and confirm password does not match");
        return;
    }
   const user = await findData(User,email)
   if(!user){
    sendResponse(res,404,"User not found");
    return;
   }
   user.password=bcrypt.hashSync(newPassword,10)
   user.otp=""
   user.otpGeneratedTime=""
   await user.save()
   sendResponse(res,200,"Password reset successfully");
}

}

export default AuthController;
