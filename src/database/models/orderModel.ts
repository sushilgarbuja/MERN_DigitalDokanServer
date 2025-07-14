import { Sequelize, Table, Column, Model, DataType } from "sequelize-typescript";
import { OrderStatus } from "../../globals/types";

@Table({
    tableName: "order",
    modelName: "order",
    timestamps: true    
})
class Order extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,   
    })
    declare id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,  // Corrected from AllowNull to allowNull
        validate: {
            len: {
                args: [10, 10],
                msg: "Please enter a valid phone number"
            }
        }
    })
    declare phoneNumber: string;

    @Column({
        type: DataType.STRING,
    })
    declare AddressLine: string;
   
    @Column({
        type: DataType.STRING,
    })
    declare City: string;
    @Column({
        type: DataType.STRING,
    })
    declare State: string;

    @Column({
        type: DataType.STRING,
    })
    declare zipCode: string;

    @Column({
        type: DataType.STRING,
  
    })
    declare shippingAddress: string;
    
    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    declare totalAmount: number;

    @Column({
        type: DataType.ENUM(OrderStatus.Cancelled, OrderStatus.Delivered, OrderStatus.Ontheway, OrderStatus.Pending, OrderStatus.Preparation, OrderStatus.Shipping),
        defaultValue: OrderStatus.Pending,
    })
    declare orderStatus: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue:"Anoymous",
    })
    declare firstName: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue:"Anoymous",

    })

    declare lastName: string;
    @Column({
        type: DataType.STRING,
        allowNull: false,
        defaultValue:"anoymous@gmail.com",

    })
    declare email: string;
}

export default Order;
