import { Query } from './index';
import { IRecipeFlavorTags } from '../../interfaces';

const all = () => Query<(IRecipeFlavorTags)[]>('SELECT * FROM RecipeFlavorTags');
const allByRecipeId = (id: string) => Query<(IRecipeFlavorTags)[]>('SELECT FlavorTags.name, FlavorTags.id FROM RecipeFlavorTags JOIN FlavorTags ON FlavorTags.id = RecipeFlavorTags.flavor_tag_id WHERE recipe_id = ?', [id]);
const insert = (newthing: IRecipeFlavorTags) => Query('INSERT INTO RecipeFlavorTags SET ?', [newthing]);
const update = (updatedX: {recipe_id: string, flavor_tags_id: string  }, id: string) => Query('UPDATE X SET ? WHERE id = ?', [updatedX, id]);
// const nuke = (id: string) => Query('DELETE from X WHERE books.id = ?', [id]);

export default {
    all,
    allByRecipeId,
    insert,
    update,
    // nuke,
}