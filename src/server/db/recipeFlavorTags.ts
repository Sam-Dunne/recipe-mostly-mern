import { Query } from './index';
import { IFlavorTags, IRecipeFlavorTags } from '../../interfaces';

const all = () => Query<(IRecipeFlavorTags)[]>('SELECT * FROM RecipeFlavorTags');

const allByRecipeId = (recipe_id: string) => Query<(IRecipeFlavorTags & IFlavorTags)[]>('SELECT FlavorTags.name, FlavorTags.id FROM RecipeFlavorTags JOIN FlavorTags ON FlavorTags.id = RecipeFlavorTags.flavor_tag_id WHERE recipe_id = ?', [recipe_id]);

const insert = (newRecipeFlavorTag: IRecipeFlavorTags) => Query('INSERT INTO RecipeFlavorTags SET ?', [newRecipeFlavorTag]);

const update = (updatedX: { flavor_tags_id: string  }, recipe_id: string) => Query('UPDATE RecipeFlavorTags SET ? WHERE recipe_id = ?', [updatedX, recipe_id]);

// removes from recipe
const nuke = (recipe_id: string, flavor_tag_id: string) => Query('DELETE from RecipeFlavorTags WHERE recipe_id = ? And flavor_tag_id = ?', [recipe_id, flavor_tag_id]);

export default {
    all,
    allByRecipeId,
    insert,
    update,
    nuke,
};

// interface IRecipeFlavorTags {
//     recipe_id?: string;
//     flavor_tag_id?: string;
// };

