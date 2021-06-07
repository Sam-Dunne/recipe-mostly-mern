import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';
import { v4 as uuid} from 'uuid'

const router = Router();

router.get('/', authenticate('jwt'), async (req, res, next) => {
    try {
        const allFlavorTags = await db.flavorTags.all();
        res.json(allFlavorTags);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({ message: 'goof: GET /api/flavortags', error: error.message})
    }
});

router.get('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const [flavorTagById] = await db.flavorTags.one(id);
        res.json(flavorTagById);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: GET /api/flavortags/id', error: error.message})
    }
});

router.post('/', authenticate('jwt'), async (req, res, next) => {
    const id = uuid();
    const newFlavorTag = req.body;
    try {
        newFlavorTag.id = id;
        const results = await db.flavorTags.insert(newFlavorTag)
        res.json({results, id, name: newFlavorTag});
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof: POST /api/flavortags', error: error.message})
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
        res.status(500).json({ message: 'goof: PUT /api/flavortags/id', error: error.message})
    }
});

router.delete('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;

    try {
        const results = await db.flavorTags.nuke(id)
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof: DELETE api/flavortags/id', error: error.message})
    }
});

export default router;