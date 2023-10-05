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
    const {taskName, completed, userid, createdFor} = req.body; 
    // console.log(user.id)
    const userId: number = userid;
    try {
        const newTask = await Task.create({taskName, completed, userid: userId, createdFor:createdFor})
        res.status(201).json(newTask)
    }
    catch (e: any) {
        console.error('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function editTaskCheck(req: Request, res: Response): Promise<void> {
    const taskId: string = req.params.taskid; 

    try {
        const taskToUpdate = await Task.findByPk(taskId)
        if (!taskToUpdate) { 
            res.status(404).json({message: 'Task not found'})
            return
        }
        const complete = taskToUpdate.completed
        taskToUpdate.completed = !complete
        await taskToUpdate.save() 
        res.status(200).json({success: true, updatedTask: taskToUpdate})
    }

    catch (e: any) {
        console.error('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function editTask(req: Request, res: Response): Promise<void> {
    const taskId: string = req.params.taskid; 
    const updateValue: string  = req.body.value

    try {
        const taskToUpdate = await Task.findByPk(taskId)
        if (!taskToUpdate) { 
            res.status(404).json({message: 'Task not found'})
            return
        }
        taskToUpdate.taskName = updateValue
        await taskToUpdate.save() 
        res.status(200).json({success: true, updatedTask: taskToUpdate.taskName})
    }

    catch (e: any) {
        console.error('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}

export async function deleteTask(req: Request, res: Response): Promise<void> {
    const taskId: string = req.params.taskid; 
    console.log(taskId)
    try {
        const deleted = await Task.destroy({where: {id: taskId}})
        if (deleted) {
            res.status(200).json({
                success: true,
            })
        }
        else {
            res.status(400).json({
                success: false, 
                message: 'something went wrong'
            })
        }
    }
    catch (e: any) {
        console.error('error', e)
        res.status(500).json({message: 'Internal server error'})
    }
}




