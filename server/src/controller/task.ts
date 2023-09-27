import { User, Task } from '../models';
import {Request, Response} from 'express';



export async function getTask(req: Request, res: Response): Promise<void> {
    try {
        const tasks = await Task.findAll({
            where: {userid: req.params.userid}});
        res.status(200).json(tasks)
    }
    catch (e: any) {
        console.log('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}


export async function addTask(req: Request, res: Response): Promise<void> {
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




