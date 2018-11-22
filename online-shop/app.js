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






app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.all('*', (req, res) => {
    res.status(404).send('Page cannot be found');
});



export default app;