import { Table, Column, Model, DataType, AllowNull } from 'sequelize-typescript';

@Table({
    tableName: 'categories',
    modelName: 'Category',
    timestamps: true,
})
class Category extends Model {
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
    categoryName!: string;

}

export default Category;
