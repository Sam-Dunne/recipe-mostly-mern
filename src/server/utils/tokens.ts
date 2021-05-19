import * as jwt from 'jsonwebtoken';
import { IPayload } from '../../interfaces';
import config from '../config';

export function createToken( { userid, email, role }: IPayload ) {
    try {
        const token = jwt.sign(            
            { userid, email, role },
            config.jwt.secret,
            { expiresIn: '15d' }
        );
        return token;
    } catch (error) {
        throw error;
    }
};