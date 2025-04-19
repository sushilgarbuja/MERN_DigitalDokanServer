import jwt from 'jsonwebtoken';
import { envConfig } from '../config/config';

const generateToken = (userId: string) => {
    //@ts-ignore
    const token = jwt.sign({ userId: userId }, envConfig.jwtSecret as string,
        {
            expiresIn: envConfig.jwtExpire // Ensure the type matches what jwt.sign expects
        }
    );

    return token;
}

export default generateToken;
