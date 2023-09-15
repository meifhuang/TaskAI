import {Request, Response} from 'express';
import * as jwtUtils from '../utils/jwt';

export function register(req: Request, res: Response): void {
    const {firstname, username, password, email} = req.body;
    try {
        if (!firstname || !username || !password || !email) {
            res.status(400).send({message: 'missing information'})
            return;
        }
        else { 
        const user = req.body
        console.log('created user')
        res.status(201).json(user) 
        }
    }
    catch (err: any) {
        res.status(400).json({error: err.message})
    }
}