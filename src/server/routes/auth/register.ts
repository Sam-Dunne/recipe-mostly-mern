import { Router } from 'express';
import db from '../../db';
import { generateHash } from '../../utils/passwords';
import { createToken } from '../../utils/tokens';
import { v4 as uuid } from 'uuid'

const router = Router();

router.post('/', async (req, res, next) => {
    const id = uuid();
    const newUser = req.body;
    try {
        newUser.id = id;
        newUser.password = generateHash(newUser.password);
        const results = await db.users.insert(newUser);
        if (results.affectedRows) {
            const token = createToken({ id: newUser.id, email: newUser.email, role: 'admin' })
            res.json({ token, name: newUser.name, email: newUser.email, user_id: newUser.id  })
        } else {
            res.status(500).json({message: 'create user failed', error: results.sqlMessage})
            
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

export default router;