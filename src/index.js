const flash = require("connect-flash");
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const passport = require("passport");
const path = require("path");
const engine = require('ejs-mate');
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);





require('./passport/local-auth');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'public','views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');




app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));


const sessionMiddleware = session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
});
app.use(sessionMiddleware);


app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    app.locals.signupMessage = req.flash('signupMessage');
    app.locals.user = req.user;
    //console.log(req);
    //console.log(app.locals)
    next();
});

app.use('/', require('./routes/index'));

//io config
const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(sessionMiddleware));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));

require('./config/socket')(io)


/*io.on('connect', (socket) => {
    console.log(`new connection ${socket.id}`);
    console.log(socket.request.user);
    socket.on('whoami', (cb) => {
      cb(socket.request.user ? socket.request.user.username : '');
      
    });
  
    const session = socket.request.session;
    console.log(`saving sid ${socket.id} in session ${session.id}`);
    session.socketId = socket.id;
    session.save();
});*/

httpServer.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});