import {
    Router
} from 'express';

import googleRouter from './google';
import githubRouter from './github';
import loginRouter from './login';

const router = Router();




router.use('/login', loginRouter);
router.use('/google', googleRouter)
router.use('/github', githubRouter)

export default router;

