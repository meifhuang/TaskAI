import { User, Task } from '../models';
import {Request, Response} from 'express';


export async function addTask(req: Request, res: Response): Promise<void> {
    console.log('add task') 
    const {taskName, completed, userid} = req.body; 
    // console.log(user.id)
    const userId: number = userid;
    try {
        const newTask = await Task.create({taskName, completed, userid: userId})
        res.status(201).json(newTask)
    }
    catch (e: any) {
        console.error('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}



