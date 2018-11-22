import { Router } from 'express';
import passport from 'passport';


const router = Router();


router.get('/', (req, res) => {
  res.sendFile('login.html', { root: '.' });
});
router.post('/',
  passport.authenticate('local', { session: false }),
  function (req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.json({ token: '' });
  }
);


export default router;