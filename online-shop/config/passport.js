import passport from 'passport';
import googleOAuth from 'passport-google-oauth';
import githubOAuth from 'passport-github2';
import passportLocal from 'passport-local'
import {
    User
} from '../models';

import config from './config.json';



export default () => {


    passport.use(new passportLocal.Strategy((username, password, done) => {
        User.findById(username).then(user => {
            done(null, user);
        }).catch(err => {
            done(err);
        })
    }));

    passport.use(new googleOAuth.OAuth2Strategy(
        config.auth.google,
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({
                googleId: profile.id
            }).then(user => {
                return done(null, user);
            })
                .catch(err => {
                    return done(err);
                });
        }));

    passport.use(new githubOAuth.Strategy(
        config.auth.github,
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({
                githubId: profile.id
            })
                .then(user => {
                    return done(null, user);
                })
                .catch(err => {
                    return done(err);
                });
        }));
}