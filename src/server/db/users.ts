import { Query } from './index';
import { IUsers } from '../../interfaces';

const all = () => Query<IUsers[]>('SELECT users.id, users.email, users.role, users._created, users.name FROM Users');

const insert = (newUser: IUsers) => Query('INSERT INTO users SET ?', [newUser]);
// find by email
const find = (column: string, value: string) => Query<IUsers[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);

export default {
    all,
    insert,
    find
}