import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';
import { v4 as uuidv4 } from 'uuid';


const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allRecipeIngredients = await db.recipeIngredients.all();
        res.json(allRecipeIngredients);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({ message: 'goof: /api/recipeingredients/id', error: error.message})
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const [recipeIngredientsbyRecipeId] = await db.recipeIngredients.allByRecipeId(id);
        res.json(recipeIngredientsbyRecipeId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: /api/recipeingredients/id', error: error.message})
    }
});

// router.post('/', async (req, res, next) => {
//     const newRecipeIngredient = req.body;
//     try {
//         const results = await db.recipeIngredients.insert(newRecipeIngredient)
//         res.json(results);
//     } catch (error) {
//           console.log(error.message);
//         res.status(500).json({ message: 'goof'})
//     }
// });

router.put('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const updatednewRecipeIngredient = req.body;
    try {
        const results = await db.recipeIngredients.update(updatednewRecipeIngredient, id);
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof: /api/recipeflavortags/id', error: error.message})
    }
});

// router.delete('/:id', async (req, res, next) => {
//     const id = req.params.id;

//     try {
//         const results = await db.recipeFlavorTags.nuke(id)
//         res.json(results);
//     } catch (error) {
//           console.log(error.message);
//         res.status(500).json({ message: 'goof'})
//     }
// });

export default router;