import { Query } from './index';
import { IIngredients } from '../../interfaces';


const all = () => Query<(IIngredients)[]>('SELECT * FROM Ingredients');
const one = (id: string) => Query<(IIngredients)[]>('SELECT * FROM Ingredients WHERE id= ?', [id]);
const insert = (newIngredient: IIngredients) => Query('INSERT INTO Ingredients SET ?', [newIngredient]);
const update = (updatedIngredient: { name: string }, id: string) => Query('UPDATE Ingredients SET ? WHERE id = ?', [updatedIngredient, id]);
const nuke = (id: string) => Query('DELETE from Ingredients WHERE id = ?', [id]);
const find = (column: string, value: string) => Query<IIngredients[]>('SELECT * FROM ingredients WHERE ?? = ?', [column, value]);


export default {
    all,
    one,
    insert,
    update,
    nuke,
    find
};

// interface IIngredients {
//     id?: string;
//     name?: string;
// };