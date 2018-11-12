import {Router} from 'express';
import { productsController } from '../../controllers';




const router = Router();


router
    .get('/', productsController.getAll)
    .post('/', productsController.addOne)
    .get('/:id', productsController.getOne)
    .get('/:id/reviews', productsController.getOneReviews);



export default router;