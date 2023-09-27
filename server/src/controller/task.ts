import { User, Task } from '../models';
import {Request, Response} from 'express';


export async function addTask(req: Request, res: Response): Promise<void> {
    console.log('add task') 
    const {taskName, completed, user} = req.body; 
    const userid: number | undefined = user.id;
    try {
        const newTask = await Task.create({taskName, completed, userid})
        res.status(201).json(newTask)
    }
    catch (e: any) {
        console.error('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}



