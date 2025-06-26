import { Request, Response } from "express";
import Order from "../database/models/orderModel";
import OrderDetails from "../database/models/orderDetails";


interface IProduct{
    productId:string,
    productQty:string,
}
class OrderController{
    async createOrder(req: Request, res: Response):Promise <void> {
        const {phoneNumber,shippingAddress,totalAmount}=req.body
        const products:IProduct[]=req.body
        if(!phoneNumber || !shippingAddress || !totalAmount){
            res.status(400).json({ message: "Please provide all fields phoneNumber,shippingAddress,totalAmount" });
            return;
        }
        const orderData=await Order.create({phoneNumber,shippingAddress,totalAmount})
        res.status(200).json({ message: "Order created successfully" });
        products.forEach( async function(product){
           await  OrderDetails.create({
                productId:product.productId,
                quantity:product.productQty,
                orderId:orderData.id
            })
        })
    }

}
export default OrderController