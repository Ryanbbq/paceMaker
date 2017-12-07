var express = require('express');
var router = express.Router();

/* Get Recipe Book Page */
router.get('/', function(req,res,next){
    res.render('recipebook',{title: 'Recipe Book'});

});

module.exports = router;