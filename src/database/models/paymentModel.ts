import { Sequelize, Table, Column, Model, DataType, PrimaryKey, AllowNull } from "sequelize-typescript";
import { PaymentMethod, PaymentStatus } from "../../globals/types";

@Table({
    tableName: "payments",
    modelName: "Payment",
    timestamps: true
})
class Payment extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
    })
    declare id:string

    @Column({
        type:DataType.ENUM(PaymentMethod.COD,PaymentMethod.khalti,PaymentMethod.esewa),
        defaultValue:PaymentMethod.COD,
    })
    declare paymentMethod:string

    @Column({
        type:DataType.ENUM(PaymentStatus.paid,PaymentStatus.unpaid),
        defaultValue:PaymentStatus.unpaid,
    })
    declare paymentStatus:string
}

export default Payment
