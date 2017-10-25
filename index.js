var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

//app.use('/about', about); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);

});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
   console.log('https://justagithubdrop-ryanlb22.c9users.io:8080/')
});
