import { Request, Response } from 'express';
import User from '../database/models/userModel';
import generateToken from '../services/jenerateToken';
import bcrypt from 'bcrypt';
import generateOtp from '../services/generateOtp';
import sendMail from '../services/sendMail';

class AuthController {
    public static async UserRegister(req: Request, res: Response): Promise<void> {
        const { email, username, password } = req.body;
        if (!email || !username || !password) {
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
        await User.create({ email, username, password: bcrypt.hashSync(password, 10) });
        res.status(200).json({ message: "User created successfully" });
    }

    public static async login(req: Request, res: Response): Promise<void> {
        // Accept incoming data -> email, password
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
    
        // Check if email exists
        const users = await User.findAll({
            where: {
                email: email
            }
        });
    
        if (users.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        } else {
            const user = users[0]; // Access the first user in the array
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid password" });
                return;
            } else {

                 const token = generateToken(user.id); // Use user.id here
                res.status(200).json({ message: "Login successful",
                    token
                 });
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
    verigyOtp(req:Request, res:Response){
        const {otp,email}=req.body;
        if(!otp || !email){
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
        const 
    }
}

// Export the class itself, not an instance
export default AuthController;
