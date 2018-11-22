import express from 'express';
import {
    cookieParser
} from './middlewares';
import {
    apiRouter,
    authRouter
} from './routes'
import bodyparser from 'body-parser';
import passport from 'passport';
import jwtUtils from './utils/jwt-utils';
import passportConfig from './config/passport'
const app = express();

passportConfig();
//configure app middleware
(function configureMiddleWare(){
app.use(cookieParser);
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(passport.initialize());
})();


app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login']
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  function (req, res) {
    res.send(jwtUtils.sign(req.user));
  });

  app.get('/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }));

  app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  function(req, res) {
    console.log(req.user);
    res.send(jwtUtils.sign(req.user));
  });



app.get('/login', (req,res) => {
    res.sendFile(__dirname + '/login.html');
});
app.post('/login',
  passport.authenticate('local', {session: false}),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({token: ''});
  }
);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.all('*', (req, res) => {
    res.status(404).send('Page cannot be found');
});



export default app;