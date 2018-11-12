import express from 'express';
import { cookieParser } from './middlewares';
import {apiRouter, authRouter} from './routes'
import bodyparser from 'body-parser';
const app = express();

app.use(cookieParser);
app.use(bodyparser.json())
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.all('*', (req, res)=> {
    res.status(404).send('Page cannot be found');
});



export default app;
