const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const dbConfig = require('./app/config/dbConfig');

const app = express();
const port = 8000;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});


//declaramos nuestra variables 
const passport = require('passport');
const LocalStrategy = require('passport-local');
//importamos nuestro modelo Usuario
User = require('./app/models/user');

//configuramos passport
app.use(require('express-session')({
  secret: 'Una frase secreta para encriptar',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
}); //le pasamos a nuestro express el usuario de manera global



app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(dbConfig.url, (err, database) => {
  if (err) return console.log(err)
  const db = database.db(dbConfig.dbName);
  require('./app/routes')(app, db);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})

app.post('/login', passport.authenticate('local',
  {
    successRedirect: '/bienvenido',
    failureRedirect: '/login',
    failureFlash: 'Usuario o contraseña incorrecto'
  }),
);
app.get('/loggout', (req, res) => {
  req.logOut();
  res.redirect('/index');
});