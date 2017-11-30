var express = require('express');
var router = express.Router();


/* Get Features Page */
router.get('/', function(req,res,next){
    res.render('features',{title: 'Recipe Vision',Name:'Recipe Search'});
});

module.exports = router;