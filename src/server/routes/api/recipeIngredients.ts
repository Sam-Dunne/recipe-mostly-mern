import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';
import { v4 as uuidv4 } from 'uuid';
import recipeFlavorTags from '../../db/recipeFlavorTags';
import { IIngredients, IRecipeingredients } from '../../../interfaces';
import recipeIngredients from '../../db/recipeIngredients';


const router = Router();

router.get('/', authenticate('jwt'), async (req, res, next) => {
    try {
        const allRecipeIngredients = await db.recipeIngredients.all();
        res.json(allRecipeIngredients);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: /api/recipeingredients/id', error: error.message })
    }
});

router.get('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const x = req.body;
    try {
        const recipeIngredientsbyRecipeId = await db.recipeIngredients.allByRecipeId(id);
        res.json(recipeIngredientsbyRecipeId);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: /api/recipeingredients/id', error: error.message })
    }
});
// single
router.post('/', authenticate('jwt'), async (req, res, next) => {
    const newRecipeIngredient = req.body;
    console.log(newRecipeIngredient)
    try {
        const results = await db.recipeIngredients.addRecipeIngredients(newRecipeIngredient)
        res.json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof' })
    }
});

// multi post 2/3 columns
router.post('/multi/:id', authenticate('jwt'), async (req, res, next) => {
    const recipe_id = req.params.id;
    const { array_of_ingredients } = req.body;
    try {
        const recipeIngredientsArr = array_of_ingredients.map((item: string) => [recipe_id, item]);

        const results = await db.recipeIngredients.addRecipeIngredients(recipeIngredientsArr);
        res.json({ results });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof' })
    }
});

// multi RecipeIngredientsFull post
router.post('/multi_ing_qty/:id', authenticate('jwt'), async (req, res, next) => {
    const recipe_id = req.params.id;
    const {array_of_ingredientUpdates} = req.body;
    try {
        const ingredient_qty_Arr = array_of_ingredientUpdates.map((item: string) => [recipe_id, item[0], item[1]] );
        // const ingredient_id_Arr = array_of_ingredientUpdates.map((item: string) => item[0] );
        // const recipe_id_Arr = array_of_ingredientUpdates.map((item: any) => recipe_id );

        const results = await db.recipeIngredients.addRecipeIngredientsFull(ingredient_qty_Arr);
        res.json( results );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof' })
    }
});

// multi RecipeIngredientsFull post for existing recipeIngredients
router.post('/multi_existing_qty/:id', authenticate('jwt'), async (req, res, next) => {
    const recipe_id = req.params.id;
    const {array_of_ingredientUpdates} = req.body;
    try {
        const toAdd_Arr = array_of_ingredientUpdates.map((item: string) => [recipe_id, item[0], item[1]] );

        // const ingredient_qty_Arr = array_of_ingredientUpdates.map((item: string) => item[1] );
        const ingredient_id_Arr = array_of_ingredientUpdates.map((item: string) => item[0] );

        const cleanup = await db.recipeIngredients.batchNuke(recipe_id)

        const results = await db.recipeIngredients.addRecipeIngredientsFull(toAdd_Arr);

        res.json( results );
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof' })
    }
});

router.post('/by_name/:id', async (req, res, next) => {
    const id = req.params.id;
    const name = req.body;
    try {
        const result = await db.recipeIngredients.findByName(id, name);
        res.json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: GET /api/ingredients/id', error: error.message})
    }
});

router.put('/:id', authenticate('jwt'), async (req, res, next) => {
    const id = req.params.id;
    const updatednewRecipeIngredient = req.body;
    try {
        const results = await db.recipeIngredients.update(updatednewRecipeIngredient, id);
        res.json(results);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: /api/recipeflavortags/id', error: error.message })
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