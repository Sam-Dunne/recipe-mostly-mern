import { Router } from 'express';
import apiRouteRouter from './apiRoute';
import usersRouter from './users';
import contactRouter from './contact';
import recipesRouter from './recipes';
import flavorTagsRouter from './flavortags';
import recipeflavorTagsRouter from './recipeFlavorTags';
import ingredientsRouter from './ingredients';
import recipeIngredientsRouter from './recipeIngredients';

const router = Router();

router.use('/recipeIngredients', recipeIngredientsRouter);
router.use('/ingredients', ingredientsRouter);
router.use('/recipeflavortags', recipeflavorTagsRouter);
router.use('/flavortags', flavorTagsRouter);
router.use('/recipes', recipesRouter);
router.use('/contact', contactRouter);
router.use('/users', usersRouter);
router.use('/apiRoute', apiRouteRouter);

export default router;