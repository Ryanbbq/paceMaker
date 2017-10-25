var express = require('express');
var router = express.Router();


/* Get Home Page */

router.get('/', function(req,res,next){
    res.render('features',{title: 'Recipe Vision'});
});

module.exports = router;