import * as express from 'express';
// import Stripe from 'stripe';
// import config from '../../config/secrets';

// // connect to stripe with our secret key
// const stripe = new Stripe(config.stripe.secret, { apiVersion: '2020-08-27' });

const router = express.Router();

// router.post('/', async (req, res) => {
//     const paymentMethod = req.body.paymentMethod;
//     const amount = req.body.amount;
//     try {
//         // await the promise to resolve to charge someone's card
//         const paymentFulfilled = await stripe.paymentIntents.create({
//             // specifcy which currency to use
//             currency: 'usd',
//             // you must multiply the currency by the lowest unit, pennies in usd
//             // stripe docs have a table for all the multipliers
//             amount: Number(amount) *100,
//             // this will automatically fullfill the charge in this promise
//             confirm: true,
//             // the paymenyMethod we created in our React component
//             payment_method: paymentMethod.id
//         });
//         res.json(paymentFulfilled);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: 'server error, check the logs' });
//     }
// });

export default router;