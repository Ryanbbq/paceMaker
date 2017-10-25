var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//file paths
var routes = require('./routes/index');
var features = require('./routes/features');



var app = express();


// views is directory for all template files
app.set('views', __dirname + '/views/pages');
//make sure files are 'ejs'

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname + 'public')));
app.set('port', (process.env.PORT || 5000));
/*
app.get('/', function(request, response) {
  response.render('pages/index');
});*/
//app.use('/', routes);
app.use('/',routes);
app.use('/features',features);






//app.use('/about', about); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


//production development...
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
   console.log('https://justagithubdrop-ryanlb22.c9users.io:8080/')
});

module.exports = app;
