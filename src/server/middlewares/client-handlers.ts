import * as path from 'path';
import { Request, Response, NextFunction} from 'express';

export const CLIENT_ROUTES = ['/edit_recipe/:id?', '/recipe_details/:id?', '/add_Ingredients/:id?', '/add', '/donate' , '/about', '/login', '/register', '/users_recipes/:email','/addRecipe', '/multiselect'];

export function clientHandler (req: Request, res: Response, next: NextFunction) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
};