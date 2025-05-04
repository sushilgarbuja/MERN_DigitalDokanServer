import { Transporter } from './../../node_modules/@types/nodemailer/index.d';
import nodemailer from 'nodemailer';
import { envConfig } from '../config/config';

interface IData{
    to:string,
    subject:string,
    text:string,
}
const sendMail=async (data:IData)=>{
   const transporter = nodemailer.createTransport({
        service: 'gmail',
         auth: {
            user: envConfig.email,
            pass:envConfig.emailPassword,
         }
    })
    const mailOptions = {
        from: "hellosushil12@gmail.com",
        to:data.to,
        subject: data.subject,
        text: data.text,
    }
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }catch(err){
        console.log(err);
    }
}

export default sendMail