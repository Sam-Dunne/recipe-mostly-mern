import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';
import { v4 as uuidv4 } from 'uuid';
import { IRecipeingredients } from '../../../interfaces';


const router = Router();

router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const [recipe] = await db.recipes.one(id);
        res.json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.get('/by/:email', async (req, res, next) => {
    const email = req.params.email;
    try {
        const [recipes] = await db.recipes.allForUser(email);
        res.json(recipes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.post('/multiInsert', async (req, res) => {
    try {
        const id = uuidv4(); // Recipe ID
        const { user_id, title, summary, instructions, array_of_ingredients } = req.body;

        const recipeResults = await db.recipes.insert({ id, user_id, title, summary, instructions });

        const ingredientValues = array_of_ingredients.map((item: IRecipeingredients) => [id, item.ingredient_id, item.ingredient_qty])
        const recipeIngredientsResults = await db.recipes.addRecipeIngredients(ingredientValues);

        if (recipeResults.affectedRows && recipeIngredientsResults.affectedRows) { // Both tables had successful insertions
            res.json({ message: "Success! Recipe successfully created", recipeID: id });
        } else {
            throw new Error("SOMEONE DIDN'T FILL OUT THEIR FIELDS RIGHT");
        }
    } catch (error) {
        res.status(500).json({ message: "An unknown error occurred!", error });
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
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    try {
        const results = await db.recipes.update(updatedRecipe, id);
        res.json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const results = await db.recipes.nuke(id)
        res.json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

export default router;