import { Router } from 'express';
import db from '../../db';
import { generateHash } from '../../utils/passwords';
import { createToken } from '../../utils/tokens';

const router = Router();

router.post('/', async (req, res, next) => {
    const id = req.params.id;
    const newUser = req.body;
    try {
        newUser.password = generateHash(newUser.password);
        const results = await db.users.insert(newUser);

        const token = createToken({ userid: newUser.id, email: newUser.email, role: 'admin' })
        res.json({ token, name: newUser.name, email: newUser.email })
    } catch (error) {
        res.json(error);
    }
});

export default router;