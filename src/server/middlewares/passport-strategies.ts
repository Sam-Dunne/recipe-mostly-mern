import * as passport from 'passport';
import * as PassportLocal from 'passport-local';
import * as PassportJWT from 'passport-jwt'
import { compareHash } from '../utils/passwords';
import { Application } from 'express';
import { IPayload } from '../../interfaces';
import config from '../config';
import db from '../db';


export function configurePassport(app: Application) {
    passport.serializeUser((user: IPayload, done) => {
        if (user.password) {
            delete user?.password;
        }
        done(null, user)
    });
    passport.deserializeUser((user, done) => done(null, user));


    passport.use(new PassportLocal.Strategy({
        usernameField: 'email',
        session: false
    }, async (email, password, done) => {
        try {
            const [userFound] = await db.users.find('email', email);
            if (userFound && compareHash(password, userFound.password)) {
                delete userFound.password;
                done(null, userFound);
            } else {
                done(null, false);
            }
        } catch (error) {
            done(error);

        }
    }));

    passport.use(new PassportJWT.Strategy({
        jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.secret
    }, (payload: IPayload, done) => {
        try {
            done(null, payload)
        } catch (error) {
            done(error);
        }
    }));

    app.use(passport.initialize());
}