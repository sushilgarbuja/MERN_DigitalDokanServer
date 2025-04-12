import express from 'express';
const app=express();

import dotenv from 'dotenv';
dotenv.config();

import './database/connection';

import userRoute from './routes/userRoute'

app.use(express.json());

app.use("",userRoute)
export default app;