import { Table,Column,Model,DataType } from "sequelize-typescript"; 

@Table({
    tableName:'blogs',
    modelName:'Blog'
})

class Blog extends Model{
    @Column({
        primaryKey:true,
        type:DataType.UUID,
        defaultValue:DataType.UUIDV4,
    })
    declare id:string;

    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    declare title:string;
}

export default Blog