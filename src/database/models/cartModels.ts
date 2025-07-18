
//userId (fk),
//productId(fk),
//quantity ,

import {Table,Column, Model, DataType} from "sequelize-typescript";

@Table({
    tableName:"carts",
    modelName:"Cart",
    timestamps:true
})

class Cart extends Model{
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        defaultValue:DataType.UUIDV4
    })
    declare id:string

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare quantity:number
  
  
  } 
  
  export default Cart