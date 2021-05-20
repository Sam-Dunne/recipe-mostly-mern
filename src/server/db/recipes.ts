import { Query } from './index';
import { IIngredients, IRecipes, IUsers } from '../../interfaces';
import users from './users';

const allForUser = (email: string) => Query<(IRecipes & IUsers)[]>('SELECT recipes.id, recipes.title, recipes.summary, recipes.instructions, recipes.user_id, recipes.created_at, recipes.edited_at, users.name AS username, users.role FROM Recipes LEFT JOIN Users ON recipes.user_id = users.id WHERE users.email=?', [email]);
const one = (id: string) => Query<IRecipes[]>('SELECT * FROM recipes WHERE id = ?', [id]);
const insert = (recipe: IRecipes) => Query('INSERT INTO recipes SET ?', [recipe]);
const update = (updatedRecipe: { title: string, content: string }, id: string) => Query('UPDATE recipes SET ? WHERE id = ?', [updatedRecipe, id]);
const nuke = (id: string) => Query('DELETE from recipes WHERE id = ?', [id]);
const addRecipeIngredients = (ingredientsArr: IIngredients[]) => Query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id, ingredient_qty) VALUES (?,?,?)', [ingredientsArr]);

export default {
    allForUser,
    one,
    insert,
    addRecipeIngredients,
    update,
    nuke,
}