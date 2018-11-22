import { Router } from 'express';
import passport from 'passport';
import jwtUtils from '../../utils/jwt-utils';


const router = Router();


router.get('/',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }));

router.get('/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: false
    }),
    function (req, res) {
        res.send(jwtUtils.sign(req.user));
    });



export default router;