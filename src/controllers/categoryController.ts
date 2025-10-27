import { Request, Response } from "express"; // Make sure to import Request and Response
import Category from "../database/models/categoryModel";

interface AddCategoryRequest extends Request {
    body: {
        categoryName?: string; // Optional property
    };
}

class CategoryController {
    categoryData = [
        {
            categoryName: "Electronics"
        },
        {
            categoryName: "Clothing"
        },
        {
            categoryName: "Furniture"
        }
    ];

    async seedCategory(): Promise<void> {
        const datas = await Category.findAll();
        if (datas.length === 0) {
            await Category.bulkCreate(this.categoryData);
            console.log("Category seeded successfully");
        } else {
            console.log("Category already exists");
        }
    }

    async addCategory(req: Request, res: Response): Promise<void> {
        //@ts-ignore
        console.log(req.userId);
        const { categoryName } = req.body;
        if (!categoryName) {
            res.status(400).json({
                message: "Please provide category name"
            });
            return;
        }

        // Add logic to create a new category here
        // For example:
        const category=await Category.create({
            categoryName
        });
        res.status(201).json({
            message: "Category added successfully",
            data:category
         });
    }


    async getCategory(req: Request, res: Response): Promise<void> {
        const data = await Category.findAll();
        res.status(200).json({
            message: "Category fetched successfully",
            data
        })
    }
    
    async deleteCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if(!id){
            res.status(400).json({ message: "Please provide category id" });
            return;
        }
        const data=await Category.findAll({
            where:{
                id:id
            }
        })
        if(data.length===0){
            res.status(404).json({ message: "Category not found" });
            return;
        }
        await Category.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json({ message: "Category deleted successfully" });
    }
    async updateCategory(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { categoryName } = req.body;
        if(!id || !categoryName){
            res.status(400).json({ message: "Please provide category id and category name" });
            return;
        }
        const data=await Category.findAll({
            where:{
                id:id
            }
        })
        if(data.length===0){
            res.status(404).json({ message: "Category not found" });
            return;
        }
        await Category.update({categoryName},{where:{id:id}})
        res.status(200).json({ message: "Category updated successfully" });
    }
}

export default new CategoryController();
