import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';

const router = Router();

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const [recipe] = await db.recipes.one(id);
        res.json(recipe);
    } catch (error) {
        res.json(error);
    }
});

router.get('/by/:email', async (req, res, next) => {
    const email = req.params.email;
    try {
        const recipes = await db.recipes.allForUser(email);
        res.json(recipes);
    } catch (error) {
        res.json(error);
    }
});

// router.get('/:id', async (req, res, next) => {
//     const id = req.params.id;
//     const x = req.body;
//     try {
//         const [bookById] = await db.books.one(id);
//         res.json(bookById);
//     } catch (error) {
//         res.json(error);
//     }
// });

router.post('/', async (req, res, next) => {
    const newRecipe = req.body;
    try {
        const results = await db.recipes.insert(newRecipe)
        res.json(results);
    } catch (error) {
        res.json(error);
    }
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    try {
        const results = await db.recipes.update(updatedRecipe, id);
        res.json(results);
    } catch (error) {
        res.json(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const results = await db.recipes.nuke(id)
        res.json(results);
    } catch (error) {
        res.json(error);
    }
});

export default router;