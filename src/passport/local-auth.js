const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//const User = require('../models/user');
const usuario = require('../service/userService');

passport.serializeUser((user, done) => {
  //console.log(user._id);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  //const user = await User.findById(id);
  
  const user = await usuario.getById(id);
  //console.log(user);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
  
}, async (req, email, password, done) => {
  //console.log("hola");
  //const user = await User.findOne({'email': email})
  const user = await usuario.getEmail(email);
  //console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    req.body.email = email;
    req.body.password = password;
    const newUser = await usuario.save(req.body);
    //console.log(newUser);
    done(null, newUser);
    /*const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser)
    await newUser.save();
    done(null, newUser);*/
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  //const user = await User.findOne({email: email});
  const user = await usuario.getEmail(email);
  if(!user) {
    return done(null, false, req.flash('signinMessage', 'No User Found'));
  }
  //console.log("hola");
  const userPass = await usuario.validPass({email: email, password: password});
  
  if(!userPass) {
    //console.log("exploto");
    return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
  }
  //console.log(user);
  return done(null, user);
}));