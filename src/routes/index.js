const router = require('express').Router();
const passport = require('passport');

const user = require('../service/userService');


router.get('/', async (req, res, next) => {
  const ususuario = await user.getEmail('lorna');
  console.log(ususuario);
  res.render('index');
  
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/roberto', (req, res) => {
  res.render('roberto');
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/roberto',
  failureRedirect: '/signup',
  failureFlash: true
}));



router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/roberto',
  failureRedirect: '/signin',
  failureFlash: true
}));

//router.post('/signup', (req, res))

module.exports = router;