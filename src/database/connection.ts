import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";
import Product from "./models/productModel";
import Category from "./models/categoryModel";
import Order from "./models/orderModel";
import User from "./models/userModel";
import Payment from "./models/paymentModel";
import OrderDetails from "./models/orderDetails";
import Cart from "./models/cartModels";

const sequelize = new Sequelize(process.env.DATABASE_URL as string,{
   
    models: [__dirname + '/models'],
    
});

try {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
})}catch (err) {
    console.error("Unable to connect to the database:", err);
}
sequelize.sync({force : false,alter:false}).then(()=>{
    console.log("synced !!")
}) 

//relationship//
Product.belongsTo(Category,{foreignKey:'categoryId'})
Category.hasOne(Product,{foreignKey:'categoryId'})

//user x order
User.hasMany(Order,{foreignKey:'userId'})
Order.belongsTo(User,{foreignKey:'userId'})

//Payment x order
Payment.hasOne(Order,{foreignKey:'paymentId'})
Order.belongsTo(Payment,{foreignKey:'paymentId'})

Order.hasOne(OrderDetails,{foreignKey:'orderId'})
OrderDetails.belongsTo(Order,{foreignKey:'orderId'})

Product.hasMany(OrderDetails,{foreignKey:'productId'})
OrderDetails.belongsTo(Product,{foreignKey:'productId'})


//cart x user
User.hasOne(Cart,{foreignKey:'userId'})
Cart.belongsTo(User,{foreignKey:'userId'})

//cart-product
Product.hasMany(Cart,{foreignKey:'productId'})
Cart.belongsTo(Product,{foreignKey:'productId'})


export default sequelize