var express = require('express');
var router = express.Router();

<<<<<<< HEAD

// Retrieve recipeValue and pass it to the database


=======
// globals
var username ="";
var youtubeAPI = process.env.youtubeAPI;
>>>>>>> origin/kristine_home

var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "kristineyvonne",
  password: "",
  database: "c9"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    //console.log(result[0].username);
    //username = result[0].username;
    //console.log(username);
    //console.log(result.id);
  });
});



/* Get Features Page */
router.get('/', function(req,res,next){
    res.render('features',{title: 'Recipe Search', youtubeAPI:youtubeAPI});
});

module.exports = router;