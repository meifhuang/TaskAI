import {Request, Response} from 'express';
import * as jwtUtils from '../utils/jwt';
import User from "../models/User"

export async function register(req: Request, res: Response): Promise<void> {
    const {firstname, username, password, email} = req.body;
    try {
        const user = await User.create(req.body)
        res.status(201).json(user) 
        }
    catch (err: any) {
        console.error(err); 
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({message: 'Validation failed'})
        }
        else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}