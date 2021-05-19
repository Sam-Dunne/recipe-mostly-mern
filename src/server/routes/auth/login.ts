import { Router } from 'express';
import { createToken } from '../../utils/tokens';
import { IReqUser } from '../../../interfaces';
import { authenticate } from 'passport';

const router = Router();

router.post('/', authenticate('local'), async (req: IReqUser, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const token = createToken({ userid: req.user.userid, email: req.user.email, role: req.user.role })
        res.json({ token, name: req.user.name, email: req.user.email })
    } catch (error) {
        res.json(error);
    }
});

export default router;