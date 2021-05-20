import * as jwt from 'jsonwebtoken';
import { IPayload } from '../../interfaces';
import config from '../config';

export function createToken( { user_id, email, role }: IPayload ) {
    try {
        const token = jwt.sign(            
            { user_id, email, role },
            config.jwt.secret,
            { expiresIn: '15d' }
        );
        return token;
    } catch (error) {
        throw error;
    }
};