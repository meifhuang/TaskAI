import {Request, Response} from 'express';
import * as jwtUtils from '../utils/jwt';
import User from "../models/User"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'; 
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 's3cr3T'


export async function register(req: Request, res: Response): Promise<void> {
    const {firstname, username, password, email} = req.body;

    if (!firstname || !username || !password || !email) {
        res.status(400).json({message: 'Missing credentials'})
        return
    }

    try {
        const hashedPass = await bcrypt.hash(password, 10);
        const user = await User.create({firstname, username, password: hashedPass, email})
        res.status(201).json(user) 
    }
    catch (err: any) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({message: 'Email already exists'})
        }
        else {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    const {username, password} = req.body

    try {
        const user = await User.findOne({where: {username}})
        if (!user) {
            res.status(401).json({message: 'Invalid credentials'})
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password) 
        if (!isPasswordValid) {
            res.status(401).json({message: 'Incorrect password'})
            return;
        } 
        const token = jwtUtils.generateToken({id: user.id, username: user.username})
        res.status(200).json({token, user}) 
    }
    catch (err) {
        console.error('Error during login', err)
        res.status(500).json({message: 'Internal server error'})
    }
}

