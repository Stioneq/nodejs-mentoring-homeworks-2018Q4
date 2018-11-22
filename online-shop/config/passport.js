import passport from 'passport';
import googleOAuth from 'passport-google-oauth';
import githubOAuth from 'passport-github2';
import passportLocal from 'passport-local'
import {
    User
} from '../models';

export default () => {


    passport.use(new passportLocal.Strategy((username, password, done) => {
        User.findById(username).then(user => {
            done(null, user);
        }).catch(err => {
            done(err);
        })
    }));

    passport.use(new googleOAuth.OAuth2Strategy({
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8080/auth/google/callback"
    }, function (accessToken, refreshToken, profile, done) {
        User.findOrCreate({
                googleId: profile.id
            }).then(user => {
                return done(null, user);
            })
            .catch(err => {
                return done(err);
            });
    }));

    passport.use(new githubOAuth.Strategy({
        clientID: "",
        clientSecret: "",
        callbackURL: "http://localhost:8080/auth/github/callback"
    }, function (accessToken, refreshToken, profile, done) {
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