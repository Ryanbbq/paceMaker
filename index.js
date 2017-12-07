var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require("mysql");
var http = require('http').Server(express);
var https = require('https');
var expressValidator = require('express-validator');
var expressSession = require('express-session');

// file paths for routing...
// check the routes folder
var routes = require('./routes/index');
var features = require('./routes/features');
var recipebook = require('./routes/recipebook');
var userRegister = require('./routes/userRegister');
var userLogin = require('./routes/userLogin');
var userUpdate = require('./routes/userUpdate');
var video = require('./routes/video');


// create app start express
var app = express();


// views is directory for all template files
app.set('views', __dirname + '/views/pages');
//make sure files are 'ejs'

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(expressSession({secret: 'max', saveUninitialized: true, resave: false}));
// console.log("static path: " + (path.join(__dirname + '/public')));

app.use(express.static(path.join(__dirname + '/public')));

// console.log("request is not handled with a static resource ");

app.set('port', (8081));

// process.env.PORT || 5000

// page routing dependencies
// use this format if you want to add a page
app.use('/', routes);
app.use('/features', features);
app.use('/recipebook', recipebook);
app.use('/video', video);
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
  console.log('https://localhost:' + app.get('port') + '/');
});

module.exports = app;