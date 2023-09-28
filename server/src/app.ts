import express, {Request, Response, Router} from 'express';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';
import {register, login} from "./controller/auth"; 
import {addTask,getTask,deleteTask,editTaskCheck, editTask} from "./controller/task"


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.post('/register', register);
app.post('/login', login);
app.get('/tasks/:userid', getTask);
app.post('/task/add', addTask)
app.put('/task/updatecheck/:taskid', editTaskCheck)
app.put('/task/update/:taskid', editTask)
app.delete('/task/:taskid', deleteTask)



export default app;
