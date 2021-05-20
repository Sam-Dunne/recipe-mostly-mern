import { Query } from './index';
import { IFlavorTags } from '../../interfaces';


const all = () => Query<(IFlavorTags)[]>('SELECT * FROM FlavorTags');
const one = (id: string) => Query<(IFlavorTags)[]>('SELECT * FROM FlavorTags WHERE id= ?', [id]);
const insert = (newthing: IFlavorTags) => Query('INSERT INTO FlavorTags SET ?', [newthing]);
const update = (updatedFlavorTags: {id: string, name: string  }, id: string) => Query('UPDATE FlavorTags SET ? WHERE id = ?', [updatedFlavorTags, id]);
const nuke = (id: string) => Query('DELETE from FlavorTags WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    nuke,
}