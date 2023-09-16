import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config";

class User extends Model {
    public id!: number;
    public firstname!: string; 
    public username!: string;
    public password!: string;
    public email!: string;
}
User.init(
    {
    firstname: {
            type: DataTypes.STRING, 
            allowNull: false, 
        }, 
        username: {
        type: DataTypes.STRING, 
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,
    }, 
}, 
{
    sequelize, 
    modelName: 'User',
    timestamps: false,
}
)

export default User; 