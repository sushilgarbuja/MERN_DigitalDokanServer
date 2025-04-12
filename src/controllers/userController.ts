import { Request, Response } from 'express';
import User from '../database/models/userModel';
import bcrypt from 'bcrypt';

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
        const user = await User.findAll({
            where: {
                email: email
            }
        });

        if (user.length === 0) {
            res.status(404).json({ message: "User not found" });
            return;
        }else{
           const isPasswordValid = bcrypt.compareSync(password,user[0].password);
           if(!isPasswordValid){
            res.status(401).json({message:"Invalid password"});
            return;
           }else{
            res.status(200).json({message:"Login successful"});
           }
        }
        
        // Generate token (JWT) here if needed
        res.status(200).json({ message: "Login successful" });
    }
}

// Export the class itself, not an instance
export default AuthController;
