import { Query } from './index';
import { IUsers } from '../../interfaces';

const all = () => Query<IUsers[]>('SELECT users.id, users.email, users.role, users.created_at, users.name FROM Users');

const insert = (newUser: IUsers) => Query('INSERT INTO users SET ?', [newUser]);
// find by email
const find = (column: string, value: string) => Query<IUsers[]>('SELECT * FROM users WHERE ?? = ?', [column, value]);

export default {
    all,
    insert,
    find
};

// interface IUsers {
//     id?: string;
//     name?: string;
//     email?: string;
//     password?: string;
//     role?: string;
//     created_at?: Date;
// };