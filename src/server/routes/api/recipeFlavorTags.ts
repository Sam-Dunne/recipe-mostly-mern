import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';

const router = Router();

router.get('/', async (req, res, next) => {
    try {
        const allRecipeFlavorTags = await db.recipeFlavorTags.all();
        res.json(allRecipeFlavorTags);
    } catch (error) {
         console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const [recipeTagsbyRecipeId] = await db.recipeFlavorTags.allByRecipeId(id);
        res.json(recipeTagsbyRecipeId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.post('/', async (req, res, next) => {
    const newRecipeFlavorTag = req.body;
    try {
        const results = await db.recipeFlavorTags.insert(newRecipeFlavorTag)
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.put('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const updatedRecipeFlavorTags = req.body;
    try {
        const results = await db.recipeFlavorTags.update(updatedRecipeFlavorTags, id);
        res.json(results);
    } catch (error) {
          console.log(error.message);
        res.status(500).json({ message: 'goof'})
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