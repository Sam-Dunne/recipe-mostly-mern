import { Query } from './index';
import { IIngredients, IRecipeingredients } from '../../interfaces';

const all = () => Query<(IRecipeingredients)[]>('SELECT * FROM Recipeingredients');

const allByRecipeId = (id: string) => Query<(IRecipeingredients)[]>('SELECT Ingredients.name, Ingredients.id, RecipeIngredients.ingredient_qty FROM RecipeIngredients JOIN Ingredients ON Ingredients.id = RecipeIngredients.ingredient_id WHERE recipe_id = ?', [id]);

const addRecipeIngredients = (recipeIngredientsArr: [string,string][]) =>
    Query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id) VALUES ?', [recipeIngredientsArr]);

// id refers to the recipes' id
const update = (updatedRecipeIngredient: { ingredient_id: string, ingredient_qty: string }, recipe_id: string) => Query('UPDATE RecipeIngredients SET ? WHERE recipe_id = ?', [updatedRecipeIngredient, recipe_id]);

// delete row by ingredient_id
const nuke = (id: string) => Query('DELETE from RecipeIngreients WHERE ingredient_id = ?', [id]);


export default {
    all,
    allByRecipeId,
    addRecipeIngredients,
    update,
    nuke,
};

// interface IRecipeingredients {
//     recipe_id?: string;
//     ingredient_id?: string;
//     ingredient_qty?: string;
// };