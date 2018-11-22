import { Router } from 'express';
import passport from 'passport';
import jwtUtils from '../../utils/jwt-utils';


const router = Router();

router.use('/login' , (req, res, next) => {
  console.log('query='+req.query.redirect);

  req.redirect = req.query.redirect;

  next();
});
router.get('/login',
  passport.authenticate('github', { scope: ['user:email'] }), (req, res) => {
    req.some = 'hello world';
  });

router.get('/callback',
  passport.authenticate('github', { failureRedirect: '/login', session: false }),
  function (req, res) {
    console.log('some'+req.redirect);
    res.redirect(req.redirect);
    //res.send(jwtUtils.sign(req.user));
  });



export default router;