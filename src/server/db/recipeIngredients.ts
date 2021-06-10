import { Query } from './index';
import { IIngredients, IRecipeingredients } from '../../interfaces';

const all = () => Query<(IRecipeingredients)[]>('SELECT * FROM Recipeingredients');

const allByRecipeId = (id: string) =>
    Query<(IRecipeingredients & IIngredients)[]>
        ('SELECT Ingredients.name, Ingredients.id, RecipeIngredients.ingredient_qty, RecipeIngredients.ingredient_id FROM RecipeIngredients JOIN Ingredients ON Ingredients.id = RecipeIngredients.ingredient_id WHERE recipe_id = ?', [id]);

// batch insert for RecipeIngredients columns recipe_id and ingredient_id
const addRecipeIngredients = (recipeIngredientsArr: [string, string][]) =>
    Query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id) VALUES ?', [recipeIngredientsArr]);

// batch insert for all RecipeIngredients columns
const addRecipeIngredientsFull = (ingredient_qty_Arr: [[string]]) =>
    Query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id, ingredient_qty) VALUES ?', [ingredient_qty_Arr]);

// batch insert for all RecipeIngredients columns
// **** Works but makes duplicate entry ****
// const addRecipeIngredientQtyToExisting = (ingredient_qty_Arr: [[string]], ingredient_id_Arr: [string][], recipe_id: string) =>
//     Query('INSERT INTO RecipeIngredients (recipe_id, ingredient_id, ingredient_qty) VALUES ? ON DUPLICATE KEY UPDATE ingredient_id = ? ON DUPLICATE KEY UPDATE recipe_id = ?', [ingredient_qty_Arr, ingredient_id_Arr, recipe_id]);
// batch insert for all RecipeIngredients columns
const findByName = (id: string, name: string) => 
Query('SELECT Ingredients.name FROM RecipeIngredients JOIN Ingredients ON Ingredients.id = RecipeIngredients.ingredient_id WHERE recipe_id = ? AND ingredients.name = ?', [id, name])

// id refers to the recipes' id
const update = (updatedRecipeIngredient: { ingredient_id: string, ingredient_qty: string }, recipe_id: string) => Query('UPDATE RecipeIngredients SET ? WHERE recipe_id = ?', [updatedRecipeIngredient, recipe_id]);

// delete row by ingredient_id
const nuke = (id: string) => Query('DELETE from RecipeIngredients WHERE ingredient_id = ?', [id]);

// delete row by ingredient_id
const batchNuke = (recipe_id: string) => Query('DELETE from RecipeIngredients WHERE recipe_id = ?', [recipe_id]);


export default {
    all,
    allByRecipeId,
    addRecipeIngredients,
    addRecipeIngredientsFull,
    findByName,
    // addRecipeIngredientQtyToExisting,
    update,
    nuke,
    batchNuke
};

// interface IRecipeingredients {
//     recipe_id?: string;
//     ingredient_id?: string;
//     ingredient_qty?: string;
// };