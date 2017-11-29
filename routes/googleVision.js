var express = require('express');
var router = express.Router();


/* Get Features Page */
router.get('/', function(req,res,next){
    res.render('googleVision',{title: 'Recipe Vision'});
});

module.exports = router;