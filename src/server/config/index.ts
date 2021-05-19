import * as dotenv from 'dotenv';
dotenv.config();

export default {
    sqlConfig: {
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST
    },
    jwt: {
        secret: process.env.JWT_SECRET
    },
    mailgun: {
        apiKey: process.env.MAILGUN_API_KEY,
        domain: process.env.MAILGUN_DOMAIN,
        toEmail: process.env.MAILGUN_TO_EMAIL
    },
    stripe: {
        secret: process.env.STRIPE_API_KEY
    }
}