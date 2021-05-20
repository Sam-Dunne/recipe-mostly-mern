import { Router } from 'express';
import db from '../../db';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allUsers = await db.users.all()
        res.json(allUsers);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
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
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.post('/', async (req, res, next) => {
    const newUser = req.body;
    try {
        const results = await db.users.insert(newUser);
        res.json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

export default router;