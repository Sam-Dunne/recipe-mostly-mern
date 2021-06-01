import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';
import { v4 as uuid} from 'uuid';

const router = Router();



router.get('/', async (req, res, next) => {
    try {
        const allIngredients = await db.ingredients.all();
        res.json(allIngredients);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({ message: 'goof: GET /api/ingredients/', error: error.message})
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const [ingredientById] = await db.ingredients.one(id);
        res.json(ingredientById);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: GET /api/ingredients/id', error: error.message})
    }
});

router.post('/', async (req, res, next) => {
    const id = uuid();
    const newIngredient = req.body;
    try {
        newIngredient.id = id;
        const results = await db.ingredients.insert(newIngredient)
        res.json({results, id});
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof: POST /api/ingredients', error: error.message})
    }
});

router.put('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const updatedIngredients = req.body;
    try {
        const results = await db.ingredients.update(updatedIngredients, id);
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof: PUT /api/ingredients/id', error: error.message})
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const results = await db.ingredients.nuke(id)
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof: DELETE /api/ingredients/id', error: error.message})
    }
});

export default router;