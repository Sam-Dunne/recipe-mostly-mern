import { Router } from 'express';

const router = Router();

router.get('/', async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        res.json('World');
    } catch (error) {
        res.json(error);
    }
});

export default router;