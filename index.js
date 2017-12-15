var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//create app start express
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var https = require('https');
var mysql = require("mysql");

// global database parameters
var clientUsername;
var clientEmail;
var clientPassword;
var clientFirstname;
var clientLastname;

// These are global variables for our firebase
var dbConnection;
var dbPass = process.env.dbPass;
var dbHost = process.env.dbHost;
var dbUser = process.env.dbUser;
var dbName = process.env.dbName;
console.log("Connected to :" + dbName);


//file paths for routing...
//check the routes folder
var routes = require('./routes/index');
var features = require('./routes/features');
var vision = require('./routes/vision');
var recipebook = require('./routes/recipebook');
var home = require('./routes/home');
var userUpdate = require('./routes/userUpdate');
var userLogin = require('./routes/userLogin');
var userRegister = require('./routes/userRegister');

// views is directory for all template files
app.set('views', __dirname + '/views/pages');
//make sure files are 'ejs'

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + '/public')));
app.set('port', (8080));

// start connection for mysql database

function myDBOPEN(){
  dbConnection = mysql.createConnection({
  host: dbHost,
  user: dbUser,
  password: dbPass,
  database: dbName,

});

dbConnection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('The database is now connected ::', results[0].solution);
});

}
myDBOPEN();
/*
app.get('/startCookie', function(req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);
  res.cookie('name', 'doggy').send('cookie set');
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);
});*/



// get recipe uri
app.get('/recipeURI', function(req, res) {

  var RECIPEVALUE = req.query.value;
  console.log(RECIPEVALUE);
  var test = req.query.testVal;
  console.log(test);
  var sql = "INSERT INTO  `recipebook` (  `recipeURI` ) VALUES ('" + RECIPEVALUE + "')";
  dbConnection.query(sql, function(err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});

// page routing dependencies
// use this format if you want to add a page
app.use('/', routes);
app.use('/features', features);
app.use('/vision', vision);
app.use('/recipebook', recipebook);
app.use('/home', home);
app.use('/userUpdate', userUpdate);
app.use('/userRegister', userRegister);
app.use('/userLogin', userLogin);

app.get('/getLogin', function(req, res) {

  console.log(req.query.username, req.query.password);

  var sql = "SELECT * FROM users WHERE username = '" + req.query.username +
    "' AND password = '" + req.query.password + "'";

  console.log(sql);

  dbConnection.query(sql, function(err, result) {
    if (err) throw err;
    console.log(result[0]);
    if (result[0]) {

      console.log(result[0].username);
      res.cookie('username', result[0].username).send('cookie set');
      var userInside = result[0].username;
    }
    else {
      console.log("no results");
    }
  });
 
});

app.get('/logout', function(req, res) {
  console.log("hello");
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



//process.env.PORT
//app.get('port')

http.listen(process.env.PORT, function() {
  console.log(process.env.IP + ":" +process.env.PORT );
});


// THE SOCKET PORTAL FOR VARIABLES
io.on('connection', function(socket) {
  // socket.emit('initialize')  
  console.log("Inside I.O connection");

  socket.on('initialize', function(data) {
    console.log(data);
    var a = data;
    clientUsername = data.usernameParam;
    clientEmail = data.emailParam;
    clientPassword = data.passwordParam;
    clientFirstname = data.firstNameParam;
    clientLastname = data.lastNameParam;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = mm + '/' + dd + '/' + yyyy;


    var sql = "INSERT INTO `users`(`username`, `email`, `password`,`date`,`firstName`,`lastName`) VALUES ('" + clientUsername + "', '" + clientEmail + "','" + clientPassword + "' , '" + today + "','" + clientFirstname + "','" + clientLastname + "')";
    //var sql = "INSERT INTO `users`(`id`, `username`, `email`, `password`, `date`, `firstName`, `lastName`) VALUES (" + null + "," + clientUsername + "," + clientEmail +"," + clientPassword + "," + DATE + "," +clientFirstname + "," + clientLastname + ")";
    console.log(sql);
    dbConnection.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    //back to specific person who emitted

    //emits to everyone
    //io.emit();
  });
  /*
  socket.on('initialize2', function(data) {
    socket.emit('c')
  });
  */
});

// con.end();
module.exports = app;