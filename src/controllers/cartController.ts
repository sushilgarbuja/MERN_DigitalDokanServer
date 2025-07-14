import { Request, Response } from 'express';
import Cart from '../database/models/cartModels';
import Product from '../database/models/productModel';
import Category from '../database/models/categoryModel';

// CartController

interface AuthRequest extends Request {
    user?: {
        id: string;
    };
}

class CartController {
    async addToCart(req: AuthRequest, res: Response) {
        // userId, productId, quantity
        const userId = req.user?.id;
        // Additional logic for adding to cart can go here
        const { productId, quantity } = req.body;
        if(!productId || !quantity){
            res.status(400).json({ message: "Please provide all fields" });
            return
        }
        //check if that item already exists on that user cart --> if -> jsut update quantity 
       let  userkoCartMaItemAlreadyXa= await Cart.findOne({
            where: {
                userId,
                productId
            }
        })
        if(userkoCartMaItemAlreadyXa){
            userkoCartMaItemAlreadyXa.quantity=userkoCartMaItemAlreadyXa.quantity+quantity
            await userkoCartMaItemAlreadyXa.save()
        }else{
            await Cart.create({
            userId,
            productId,
            quantity
        })
        }
        const cartData = await Cart.findAll({
            where:{
                userId
            },
            include:[
                {
                    model:Product,
                    include:[
                        {
                            model:Category,
                            
                        }
                    ]
                }
            ]

        })
        res.status(200).json({ message: "Item added to cart successfully",
            data: cartData
         });
        //select * from cart where productid =? and userid = ?
        
        
    }
    async getMyCartItems(req: AuthRequest, res: Response) {
        const userId = req.user?.id;
        const cartItems = await Cart.findAll({
            where: {
                userId
            },
            include:[
                {
                    model:Product,
                    attributes:['id','productName','productPrice','productImage']
                }
            ]
        });
        if(cartItems.length===0){
            res.status(404).json({ message: "Cart is empty" });
            return
        }
        res.status(200).json({ message: "My cart items fetched successfully",
        data:cartItems
        });
        
    }

    // Remove item from cart
    async deleteMycartItem(req: AuthRequest, res: Response) {
  const userId = req.user?.id;
  const { productId } = req.params;
  const cartItem = await Cart.findOne({
    where: {
      userId,
      productId, // Changed productId to id
    },
  });
  if (!cartItem) {
    res.status(404).json({ message: "Cart item not found" });
    return;
  }
  await Cart.destroy({
    where: {
      userId,
      productId,
    },
  });
  res.status(200).json({ message: "Item removed from cart successfully" });
}

    //update cart item quantity
    async updateCartItemQuantity(req: AuthRequest, res: Response) {
        const userId = req.user?.id;
        const { productId } = req.params;
        const { quantity } = req.body;
        if (!quantity) {
            res.status(400).json({ message: "Please provide quantity" });
            return;
        }
        const cartItem= await Cart.findOne({
            where: {
                userId,
                productId
            }
        })
        if(!cartItem){
            res.status(404).json({ message: "Cart item not found" });
        }else{
            cartItem.quantity=quantity
            await cartItem.save()
        res.status(200).json({ message: "Cart item quantity updated successfully" });
        }
    }


}

export default new CartController();
