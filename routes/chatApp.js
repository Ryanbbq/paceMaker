var express = require('express');
var router = express.Router();


/* Get chat App Page */
router.get('/', function(req,res,next){
    res.render('chatApp.ejs',{title: 'Recipe Vision'});
});

module.exports = router;