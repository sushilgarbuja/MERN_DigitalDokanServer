import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'products',
    modelName: 'Product',
    timestamps: true,
})
class Product extends Model {
    @Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    })
    id!: string; // Use '!' to indicate that this property will be initialized

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
   productName!: string;

    @Column({
        type: DataType.STRING,
    })
    productDescription!: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    productPrice!: number;

    @Column({
        type: DataType.INTEGER
    })
    productTotalStock!: number;

    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    discount!:number;

    @Column({
      type:DataType.STRING  
    })
    productImage!:string

}

export default Product;
