var express = require('express');
var router = express.Router();


/* Get Home Page */
router.get('/', function(req,res,next){
    res.render('recipebook',{title: 'Recipe Book'});
});

module.exports = router;