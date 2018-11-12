import {Router} from 'express';
import {usersController} from '../../controllers'



const router = Router();


router.all('/', usersController.getAll);



export default router;