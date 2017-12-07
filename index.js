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

// global keys
var googleVisionKEY = process.env.googleVisionKEY;


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
app.set('port', (8082));

// start connection for mysql database
var con = mysql.createConnection({
  host: "localhost",
  user: "ryanlb22",
  password: "",
  database: "c9"
});

app.get('/startCookie', function(req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);
  res.cookie('name', 'doggy').send('cookie set');
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);
});

app.set('port', (8081));

// get recipe uri
app.get('/recipeURI', function(req, res) {
  var RECIPEVALUE = req.query.value;
  console.log(RECIPEVALUE);
  var test = req.query.testVal;
  console.log(test);
  var sql = "INSERT INTO  `recipebook` (  `recipeURI` ) VALUES ('" + RECIPEVALUE + "')";
  con.query(sql, function(err, result) {
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

// app.use('/about', about); 
var con = mysql.createConnection({
  host: "localhost",
  user: "brilit96",
  password: "",
  database: "c9"
});

app.get('/info', function(req, res) {
  var FIRST_NAME = req.query.firstName;
  var LAST_NAME = req.query.lastName;
  var EMAIL = req.query.email;
  var USERNAME = req.query.username;
  var PASSWORD = req.query.password;

  var sqlStmnt = "SELECT username FROM users";

  con.query(sqlStmnt, function(err, result) {
    if (err) throw err;
    var incomplete;
    for (var i = 0; i < result.length; i++) {
      if (result[i].username === USERNAME) {
        console.log("Username already taken");
        incomplete = true;
        break;
        }
      }
      
      if(!incomplete) {
      //DO NOT PUT QUOTES AROUND TABLE/COLUMN NAMES
        var sql = "INSERT INTO users (id, username, email, password) VALUES (" + null + ", '" + USERNAME + "', '" + EMAIL + "', '" + PASSWORD + "')";
        console.log(sql);
        con.query(sql, function(err, result) {
          if (err) throw err;
          console.log("User inserted");
        });  
      }
  });
});

app.get('/anything', function(req, res) {
  
  console.log(req.query.username, req.query.password);
  
  var sql = "SELECT * FROM users WHERE username = '" + req.query.username + 
            "' AND password = '" +  req.query.password + "'";
  
  console.log(sql);
  
  con.query(sql, function(err, result) {
    if (err) throw err;
    
    if(result) {
      console.log(result[0].username);
      res.cookie('username', result[0].username).send('cookie set');
    } else {
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


// production development...
// error handler
/*
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
/*

http.listen(8081, function() {
  console.log(process.env.IP + ":" +8081);
});*/

/*
app.listen(app.get('port'), function() {
  console.log('Recipe Vision Server 1 is running on port:', app.get('port'));
  console.log('Please visit the server on: https://localhost:' + app.get('port')+'/');
});*/




http.listen(app.get('port'), function() {
  console.log(process.env.IP + ":" + app.get('port'));
});

// THE SOCKET PORTAL FOR VARIABLES
io.on('connection', function(socket) {
  // socket.emit('initialize')  
  console.log("Inside I.O connection");

  socket.on('initialize', function(data) {
    console.log(data);
    var a = data.usernameParam;
    clientUsername = data.usernameParam;
    clientEmail = data.emailParam;
    clientPassword = data.passwordParam;

    var sql = "INSERT INTO `users`(`username`, `email`, `password`) VALUES ('" + clientUsername + "', '" + clientEmail + "','" + clientPassword + "')";
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });

    //back to specific person who emitted
    socket.emit('chat', a);
    //emits to everyone
    //io.emit();
  });

});

module.exports = app;