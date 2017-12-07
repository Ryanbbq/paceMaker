var express = require('express');
var router = express.Router();


/* Get INDEX Page */
router.get('/', function(req,res,next){
    res.render('index',{title: 'Recipe Vision'});
});

module.exports = router;