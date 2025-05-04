import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: 'users',
    modelName: 'User',
    timestamps: true,
})
class User extends Model {
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
    username!: string;

    @Column({
        type: DataType.STRING,
    })
    email!: string;

    @Column({
        type: DataType.STRING,
    })
    password!: string;

    @Column({
        type: DataType.ENUM('customer', 'admin'),
        defaultValue: 'customer',
    })
    role!: string;

    @Column({
        type: DataType.STRING,
    })
    otp!: string;

    @Column({
        type: DataType.STRING,
    })
    otpGeneratedTime!: string;
}

export default User;
