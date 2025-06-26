import { Table, Column, Model, DataType, AllowNull, PrimaryKey, Default } from 'sequelize-typescript';

@Table({
  tableName: 'products',
  modelName: 'Product',
  timestamps: true,
})
class Product extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({
    type: DataType.UUID,
  })
  declare id: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare productName: string;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  declare productDescription?: string;

  @AllowNull(false)
  @Column({
    type: DataType.FLOAT,
  })
  declare productPrice: number;

  @AllowNull(true)
  @Column({
    type: DataType.INTEGER,
  })
  declare productTotalStock?: number;

  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
  })
  declare discount: number;

  @AllowNull(true)
  @Column({
    type: DataType.STRING,
  })
  declare productImage?: string;
}

export default Product;// try this