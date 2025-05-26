import { Sequelize, Table, Column, Model, DataType, PrimaryKey, AllowNull } from "sequelize-typescript";

@Table({
    tableName: "order_details",
    modelName: "order_details",
    timestamps: true
})

class OrderDetails extends Model{
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    declare id: string

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    declare quantity: number
}

export default OrderDetails