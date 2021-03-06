import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { IReqUser } from '../../../interfaces';
import { authenticate } from 'passport';

const router = Router();

router.post('/', authenticate('local'), async (req: IReqUser, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const token = createToken({ id: req.user.id, email: req.user.email, role: req.user.role })
        res.json({ token, name: req.user.name, email: req.user.email, id: req.user.id })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

export default router;