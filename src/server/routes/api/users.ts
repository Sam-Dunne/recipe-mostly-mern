import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await db.users.all()
        res.json(allUsers);
    } catch (error) {
        res.json(error);
    }
});

router.get('/find', async (req, res, next) => {
    const id = req.params.id;
    const column = req.body.column;
    const email = req.body.email;
    try {
        const [userByEmail] = await db.users.find(column, email)
        res.json(userByEmail);
    } catch (error) {
        res.json(error);
    }
});

router.post('/', async (req, res, next) => {
    const newUser = req.body;
    try {
        const results = await db.users.insert(newUser);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
});

export default router;