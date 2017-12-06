var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http').Server(express);
var io = require('socket.io')(http);
var https = require('https');


var googleVisionKEY = process.env.googleVisionKEY;



// file paths for routing...
// check the routes folder
// create format similar to this make sure to check below for another dependency
var routes = require('./routes/index');
var features = require('./routes/features');
var recipebook = require('./routes/recipebook');
var vision = require('./routes/vision');

// create app start express
var app = express();


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
// or set the port number to this if its not working process.env.PORT || 5000

// page routing dependencies
// use this format if you want to add a page
app.use('/', routes);
app.use('/features', features);

// start connection for mysql database
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "ryanlb22",
  password: "",
  database: "c9"
});


 // get recipe uri
app.get('/recipeURI', function(req, res){

 var RECIPEVALUE = req.query.value;
 console.log(RECIPEVALUE);
 
 var sql = "INSERT INTO  `recipebook` (  `recipeURI` ) VALUES ('"+RECIPEVALUE+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});

 // get recipe label
app.get('/recipeLabel', function(req, res){

 var RECIPELABEL = req.query.value;
 console.log(RECIPELABEL);
 
 var sql = "INSERT INTO  `recipebook` (  `recipeURI` ) VALUES ('"+RECIPELABEL+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});


// page routing dependencies
// use this format if you want to add a page
app.use('/', routes);
app.use('/features', features);
app.use('/recipebook',recipebook);
app.use('/vision',vision);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(app.get('port'), function() {
  console.log('Recipe Vision Server 1 is running on port:', app.get('port'));
  console.log('Please visit the server on: https://localhost:' + app.get('port')+'/');
});

module.exports = app;