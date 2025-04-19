
import {config} from 'dotenv';
config();


export const envConfig={
    port:process.env.PORT,
    connectionString:process.env.DATABASE_URL,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpire:process.env.JWT_EXPIRE,
}