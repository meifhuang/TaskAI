import {Request, Response} from 'express';
import * as jwtUtils from '../utils/jwt';
import User from "../models/User"
import bcrypt from 'bcryptjs';


export async function register(req: Request, res: Response): Promise<void> {
    const {firstname, username, password, email} = req.body;

    if (!firstname || !username || !password || !email) {
        res.status(400).json({message: 'Missing info'})
        return
    }

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({firstname, username, password: hashedPass, email})
        res.status(201).json(user) 
        }
    catch (err: any) {
        console.error(err); 
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({message: 'Validation failed'})
        }
        else if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({message: 'Email already exists'})
        }
        else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}