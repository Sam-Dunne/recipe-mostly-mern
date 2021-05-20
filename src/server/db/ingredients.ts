import { Query } from './index';
import { IIngredients } from '../../interfaces';


const all = () => Query<(IIngredients)[]>('SELECT * FROM Ingredients');
const one = (id: string) => Query<(IIngredients)[]>('SELECT * FROM Ingredients WHERE id= ?', [id]);
const insert = (newthing: IIngredients) => Query('INSERT INTO Ingredients SET ?', [newthing]);
const update = (updatedIngredient: {id: string, name: string  }, id: string) => Query('UPDATE Ingredients SET ? WHERE id = ?', [updatedIngredient, id]);
const nuke = (id: string) => Query('DELETE from Ingredients WHERE id = ?', [id]);

export default {
    all,
    one,
    insert,
    update,
    nuke,
}