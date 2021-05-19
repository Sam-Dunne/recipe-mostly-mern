import { Request } from 'express';

export interface I {

};
export interface IRecipes {
    id?: string;
    title?: string;
    content?: string;
    userid?: number;
    created_at?: Date;
    edited_at?: Date;
};
export interface IUserRecipes {
    id?: string;
    title?: string;
    content?: string;
    userid?: number;
    created_at?: Date;
    edited_at?: Date;
    username?: string;
};

export interface IUsers {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    _created?: Date;
};

export interface IPayload extends IUsers {
    userid?: number;
};

export interface IReqUser extends Request {
    user?: IPayload;
};

export interface IReqPayload extends Request {
    user?: {
        userid?: number;
        email?: string;
        role?: string
    }
};

export interface MySQLResponse {
    affectedRows: number;
    insertId: number;
}