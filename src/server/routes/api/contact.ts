import * as express from 'express';
// import * as Mailgun from 'mailgun.js';
// import * as FormData from 'form-data';
// import MailGun from 'mailgun.js';
// import config from '../../config/';

// const mailgun = new(<typeof MailGun>(<any>Mailgun))(<any>FormData).client({
//     username: 'api',
//     key: config.mailgun.apiKey
// })

const router = express.Router();

// router.post('/', async (req,res) => {
//     const newEmail = req.body;
//     try {
//         const result = await mailgun.messages.create(config.mailgun.domain, {
//             to: config.mailgun.toEmail,
//             subject: newEmail.subject,
//             from: newEmail.from,
//             text: newEmail.message
//         })
//         res.json({result, newEmail})
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: 'goof'})
//     }
    
//     // const newEmail = req.body;
//     try {
//         const result = await mailgun.messages.create(config.mailgun.domain, {
//             to: newEmail.from,
//             subject: `Thanks for Contacting me...${newEmail.from}`,
//             from: config.mailgun.toEmail,
//             text: `Lorem ipsum`
//         })
//         res.json({result, newEmail})
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: 'goof'})
//     }
// })

export default router;