import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config";

class Task extends Model {
    public id!: number;
    public taskName!: string;
    public completed!: boolean;
    public dateCreated!: Date;
    public updatedAt!: Date; 
}
Task.init(
    {
    userid: {
        type: DataTypes.INTEGER,
        allowNull: false }
    ,
   taskName: {
        type: DataTypes.STRING, 
        allowNull: true, 
        }, 
    completed: {
        type: DataTypes.BOOLEAN, 
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, 
{
    sequelize, 
    modelName: 'Task',
    timestamps: true,
}
)

export default Task; 