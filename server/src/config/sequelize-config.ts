import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(
    'TaskAI', process.env.DB_USERNAME || "" , process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql', 
})

export default sequelize; 