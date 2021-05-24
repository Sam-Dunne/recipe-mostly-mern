import { Query } from './index';
import { IRecipeFlavorTags, IRecipes, IUsers } from '../../interfaces';
import users from './users';

const allForUser = (id: string) =>
    Query<(IRecipes & IUsers)[]>
        ('SELECT recipes.id, recipes.title, recipes.summary, recipes.instructions, recipes.user_id, recipes.created_at, recipes.edited_at, users.name AS username, users.role FROM Recipes LEFT JOIN Users ON recipes.user_id = users.id WHERE users.id=?', [id]);

const one = (id: string) => Query<IRecipes[]>('SELECT * FROM recipes WHERE id = ?', [id]);

const insert = (recipe: IRecipes) => Query('INSERT INTO recipes SET ?', [recipe]);

const update = (updatedRecipe: { title: string, content: string }, id: string) => Query('UPDATE recipes SET ? WHERE id = ?', [updatedRecipe, id]);

const nuke = (id: string) => Query('DELETE from recipes WHERE id = ?', [id]);

// Get: SELECT * from Recipes plus * concatenated RecipeIngredients by recipe_id
const getRecipeAndConcatRecipeIngredientValuesByRecipeId = (recipe_id: string) => Query('CALL spConcatRecipeIngredients(?)', [recipe_id]);

// user's recipes by flavortag
const usersRecipesByFlavorTag = (flavorTagId: string, recipeUserId: string) => Query<(IRecipes & IRecipeFlavorTags)[]>('SELECT * FROM Recipes JOIN RecipeFlavorTags ON Recipes.id = RecipeFlavorTags.recipe_id WHERE RecipeFlavorTags.flavor_tag-id = ? AND Recipe.user_id = ?', [flavorTagId, recipeUserId]);

export default {
    allForUser,
    one,
    insert,
    update,
    nuke,
    getRecipeAndConcatRecipeIngredientValuesByRecipeId,
    usersRecipesByFlavorTag

};


// interface IRecipes {
//     id?: string;
//     title?: string;
//     summary?: string;
//     instructions?: string;
//     user_id?: number;
//     created_at?: Date;
//     edited_at?: Date;
// };