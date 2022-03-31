const router = require('express').Router();
const passport = require('passport');

const user = require('../service/userService');


router.get('/', async (req, res, next) => {
  //const ususuario = await user.getEmail('lorna');
  //console.log(ususuario);
  res.render('index');
  
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.get('/home', (req, res) => {
  //console.log(req);
  res.render('home', {userName: req.user.emai});
});

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect: '/home',
  failureRedirect: '/signup',
  failureFlash: true
}));



router.post('/signin', passport.authenticate('local-signin', {
  successRedirect: '/home',
  failureRedirect: '/signin',
  failureFlash: true
}));

//router.post('/signup', (req, res))

module.exports = router;