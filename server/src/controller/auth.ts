import {Request, Response} from 'express';
import * as jwtUtils from '../utils/jwt';

export function register(req: Request, res: Response): void {
    try {
        const user = req.body
        res.status(201).json(user) 
    }
    catch (err: any) {
        res.status(400).json({error: err.message})
    }
}