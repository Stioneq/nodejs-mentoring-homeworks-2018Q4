import {Router} from 'express';
import usersRouter from './users';
import productsRouter from './products';
import {jwtAuth} from '../../middlewares';

const router = Router();

router.use(jwtAuth);
router.use('/users', usersRouter);
router.use('/products', productsRouter);

export default router;

