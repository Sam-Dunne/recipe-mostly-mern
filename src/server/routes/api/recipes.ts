import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';
import { v4 as uuid } from 'uuid';
import { IIngredients, IRecipeingredients, IReqPayload } from '../../../interfaces';
import recipeFlavorTags from '../../db/recipeFlavorTags';


const router = Router();

router.get('/user_recipes_flavortag/:id', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const flavor_tag_id = req.params.id;
    const recipeUserId = req.user.id;
    try {
        const recipesByTag = await db.recipes.usersRecipesByFlavorTag(flavor_tag_id, recipeUserId)
        res.json(recipesByTag);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

// get by recipe id
router.get('/:id', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const id = req.params.id;
    try {
        const [recipe] = await db.recipes.one(id);
        res.json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

// all recipes by userid
router.get('/all_by/:id', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const id = req.params.id;
    try {
        const recipes = await db.recipes.allForUser(id);
        res.json(recipes);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.get('/one_special/:id', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const id = req.user.id;
    try {
        const recipe = await db.recipes.getRecipeAndConcatRecipeIngredientValuesByRecipeId(id);
        res.json(recipe);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
})

// inserts to recipes, in
router.post('/multiInsert', authenticate('jwt'), async (req: IReqPayload, res) => {
    try {
        const user_id = req.user.id;
        const id = uuid(); // Recipe ID
        const { title, summary, instructions, array_of_ingredients, flavor_tag_id } = req.body;

        const recipeResults = await db.recipes.insert({ id, user_id, title, summary, instructions });
        
        const insertIngredientsValues = array_of_ingredients.map((ingredient: IIngredients) => [id, ingredient.name]);
        const insertIngredientsResults = await db.ingredients.insert(insertIngredientsValues);

        const recipeIngredientValues = array_of_ingredients.map((item: IRecipeingredients) => [id, insertIngredientsResults.insertId, item.ingredient_qty]);
        const recipeIngredientsResults = await db.recipeIngredients.addRecipeIngredients(recipeIngredientValues);

        const flavorTagValues = await db.recipeFlavorTags.insert({ flavor_tag_id, recipe_id: id});

        if (recipeResults.affectedRows && recipeIngredientsResults.affectedRows && flavorTagValues.affectedRows && insertIngredientsResults.affectedRows ) { // All tables had successful insertions
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

// used in add Recipe step 1
router.post('/', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const id = uuid();
    const newRecipe = req.body;
    newRecipe.user_id = req.user.id
    try {
        newRecipe.id = id;
        const results = await db.recipes.insert(newRecipe)
        res.json({ message: "Success! Recipe successfully created", recipeID: id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof: POST api/recipes/'})
    }
});

router.put('/:id', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const id = req.params.id;
    const updatedRecipe = req.body;
    try {
        const results = await db.recipes.update(updatedRecipe, id);
        res.json({ message: "Success! Recipe successfully updated", recipeID: id });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

router.delete('/:id', authenticate('jwt'), async (req: IReqPayload, res, next) => {
    const id = req.params.id;
    const user_id = req.user.id
    try {
        const results = await db.recipes.nuke(id)
        res.json({ message: "Success! Recipe successfully created", recipeID: id, user_id });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'goof'})
    }
});

export default router;