import jwt from 'jsonwebtoken'; 
import * as dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 's3cr3T'

export function generateToken(payload: object): string {
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'});
}

export function verifyToken(token: string): object | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        return decoded as object;
    }
    catch (err) {
        return null
    }
}