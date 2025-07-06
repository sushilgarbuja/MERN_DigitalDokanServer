
import { Request, Response } from "express";
import Product from "../database/models/productModel";
import Category from "../database/models/categoryModel";

// interface ProductRequest extends Request {
//     file?: {
//         filename:string
//     },
// }
class ProductController{
   async createProduct(req: Request, res: Response):Promise <void> {
        try{
            const {productName,productDescription,productPrice,productTotalStock,discount,categoryId}=req.body
        console.log(req.file);
        const filename=req.file?req.file.filename:'https://weimaracademy.org/wp-content/uploads/2021/08/dummy-user.png'
        if(!productName || !productDescription || !productPrice || !productTotalStock || !categoryId){
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
        const product=await Product.create(
            {
                productName,
                productDescription,
                productPrice,
                productTotalStock,
                discount:discount||0,
                categoryId:categoryId,
                productImage:filename
            }
        )
        res.status(200).json({ message: "Product created successfully",
        data:product
         });
        }catch(err:any){
             res.status(500).json({ message: "Something went wrong",errormessage:err.message });
        }
        
    }
    async getAllProducts(req: Request, res: Response):Promise <void> {
        const datas = await Product.findAll({
            include:[
                {
                    model:Category,
                    attributes:['id','categoryName']
                }
            ]
        });
        res.status(200).json({
            message: "Product fetched successfully",
            data:datas
        })
    }
       async DeleteProduct(req: Request, res: Response):Promise <void> {
        const {id}=req.params
        const datas = await Product.findAll({
            where:{
                id:id
            }
        })
        if(datas.length===0){
            res.status(404).json({ message: "Product not found" });
            return;
        }
        await Product.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: "Product deleted successfully" });
    }
        async getSingleProducts(req: Request, res: Response):Promise <void> {
        const {id}=req.params
        const datas = await Product.findAll({
            where:{
                id:id
            },
            include:[
                {
                    model:Category,
                    attributes:['id','categoryName']
                }
            ]
        })
            res.status(200).json({
            message: "Single Product fetched successfully",
            data:datas
        })
        
        
    }
    //upddate
    async updateProduct(req: Request, res: Response):Promise <void> {
        const {id}=req.params
        const {productName,productDescription,productPrice,productTotalStock,discount,categoryId}=req.body
        if(!productName || !productDescription || !productPrice || !productTotalStock || !categoryId){
            res.status(400).json({ message: "Please provide all fields" });
            return;
        }
        await Product.update({productName,productDescription,productPrice,productTotalStock,discount,categoryId},{where:{id:id}})
        res.status(200).json({ message: "Product updated successfully" });
    }

}
export default new ProductController