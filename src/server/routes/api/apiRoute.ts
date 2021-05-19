import { Router } from 'express';
import db from '../../db';
import { authenticate } from 'passport';

const router = Router();

// router.get('/', async (req, res, next) => {
//     try {
//         const allBooks = await db.books.all();
//         res.json(allBooks);
//     } catch (error) {
//         res.json(error);
//     }
// });

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

// router.post('/', authenticate('jwt'), async (req, res, next) => {
//     const newBook = req.body;
//     try {
//         const results = await db.books.insert(newBook)
//         res.json(results);
//     } catch (error) {
//         res.json(error);
//     }
// });

// router.put('/:id', authenticate('jwt'), async (req, res, next) => {
//     const id = req.params.id;
//     const updatedBook = req.body;
//     try {
//         const results = await db.books.update(updatedBook, id);
//         res.json(results);
//     } catch (error) {
//         res.json(error);
//     }
// });

// router.delete('/:id', authenticate('jwt'), async (req, res, next) => {
//     const id = req.params.id;

//     try {
//         const results = await db.books.nuke(id)
//         res.json(results);
//     } catch (error) {
//         res.json(error);
//     }
// });

export default router;