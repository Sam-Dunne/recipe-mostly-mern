import { Request } from 'express';

export interface I {

};
export interface IRecipes {
    id?: string;
    title?: string;
    summary?: string;
    instructions?: string;
    user_id?: number;
    created_at?: Date;
    edited_at?: Date;
};

export interface IUserRecipes {
    id?: string;
    title?: string;
    summary?: string;
    instructions?: string;
    user_id?: number;
    created_at?: Date;
    edited_at?: Date;
    user_name?: string;
};

export interface IUsers {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    created_at?: Date;
};

export interface IFlavorTags {
    id?: string;
    name?: string;
    created_at?: Date;
};

export interface IRecipeFlavorTags {
    recipe_id?: string;
    flavor_tag_id?: string;
};

export interface IIngredients {
    id?: string;
    name?: string;
};

export interface IRecipeingredients {
    recipe_id?: string;
    ingredient_id?: string;
    ingredient_qty?: string;
};

export interface IPayload extends IUsers {
    id?: string;
};

export interface IReqUser extends Request {
    user?: IPayload;
};

export interface IReqPayload extends Request {
    user?: {
        id?: string;
        email?: string;
        role?: string
    }
};

export interface MySQLResponse {
    affectedRows: number;
    insertId: number;
    sqlMessage: string;
}