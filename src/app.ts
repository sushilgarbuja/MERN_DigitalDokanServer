import express from 'express';
const app=express();

import dotenv from 'dotenv';
dotenv.config();

import './database/connection';

import userRoute from './routes/userRoute'
import categoryRoute from './routes/categoryRoute'
import productRoute from './routes/productRoute'
import orderRoute from './routes/orderRoutes'
import cardRoute from './routes/cartRoutes'

app.use(express.json());

app.use("",userRoute)
app.use("/api/category",categoryRoute)
app.use("/api/product",productRoute)
app.use('/api/order',orderRoute)
app.use('/api/cart',cardRoute)

export default app;