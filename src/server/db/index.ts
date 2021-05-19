import * as mysql from 'mysql';
import { MySQLResponse } from '../../interfaces';
import config from '../config';

const pool = mysql.createPool(config.sqlConfig);

export const Query = <T = MySQLResponse>(queries: string, values?: any) => {
    return new Promise<T>((resolve, reject) => {
        pool.query(queries, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results)
            }
        })
    })
};

// import basicCrud from './basicCrud';
import users from './users';
import recipes from './recipes';

export default {
    // basicCrud,
    users,
    recipes
};