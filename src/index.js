const flash = require("connect-flash");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const engine = require('ejs-mate');





const app = express();
require('./passport/local-auth');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');




app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    //console.log(req);
    console.log(app.locals)
    next();
  });

app.use('/', require('./routes/index'));


app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});