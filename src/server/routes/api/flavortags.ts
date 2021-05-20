import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allFlavorTags = await db.flavorTags.all();
        res.json(allFlavorTags);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const [flavorTagById] = await db.flavorTags.one(id);
        res.json(flavorTagById);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.post('/', async (req, res, next) => {
    const newFlavorTag = req.body;
    try {
        const results = await db.flavorTags.insert(newFlavorTag)
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.put('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const updatedFlavorTags = req.body;
    try {
        const results = await db.flavorTags.update(updatedFlavorTags, id);
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const results = await db.flavorTags.nuke(id)
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

export default router;