import { DataTypes, Model } from "sequelize";
import sequelize from "../config/sequelize-config";

class Task extends Model {
    public id!: number;
    public taskName!: string;
    public completed!: boolean;
    public dateCreated!: Date;
    public updatedAt!: Date; 
    public dueDate!: Date; 
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
    createdFor: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, 
{
    sequelize, 
    modelName: 'Task',
    timestamps: true,
}
)

export default Task; 