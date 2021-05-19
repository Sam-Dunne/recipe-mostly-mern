import { Query } from './index';
import { IRecipes, IUsers } from '../../interfaces';
import users from './users';

const allForUser = (email: string) => Query<(IRecipes & IUsers)[]>('SELECT recipes.id, recipes.title, recipes.content, recipes.userid, recipes.created_at, recipes.edited_at, users.name AS username FROM recipes LEFT JOIN users ON recipes.userid = users.id WHERE users.email = ?', [email]);
const one = (id: string) => Query<IRecipes[]>('SELECT * FROM recipes WHERE id = ?', [id]);
const insert = (recipe: IRecipes) => Query('INSERT INTO recipes SET ?', [recipe]);
const update = (updatedRecipe: { title: string, content: string }, id: string) => Query('UPDATE recipes SET ? WHERE id = ?', [updatedRecipe, id]);
const nuke = (id: string) => Query('DELETE from recipes WHERE id = ?', [id]);

export default {
    allForUser,
    one,
    insert,
    update,
    nuke,
}