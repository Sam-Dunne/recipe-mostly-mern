import { Query } from './index';
import { IIngredients, IRecipeingredients } from '../../interfaces';

const all = () => Query<(IRecipeingredients)[]>('SELECT * FROM Recipeingredients');
const allByRecipeId = (id: string) => Query<(IRecipeingredients)[]>('SELECT Ingredients.name, Ingredients.id, RecipeIngredients.ingredient_qty FROM RecipeIngredients JOIN Ingredients ON Ingredients.id = RecipeIngredients.ingredient_id WHERE recipe_id = ?', [id]);
const addRecipeIngredients = (ingredientsArr: IIngredients[]) => Query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id, ingredient_qty) VALUES (?,?,?)', [ingredientsArr]);
const update = (updatedX: {recipe_id: string, flavor_tags_id: string  }, id: string) => Query('UPDATE X SET ? WHERE id = ?', [updatedX, id]);
// const nuke = (id: string) => Query('DELETE from X WHERE books.id = ?', [id]);

export default {
    all,
    allByRecipeId,
    addRecipeIngredients,
    update,
    // nuke,
}