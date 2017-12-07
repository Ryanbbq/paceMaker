var express = require('express');
var router = express.Router();

var gKEY = process.env.googleVisionKEY;

/* Get Vision Page */
router.get('/', function(req,res,next){
    res.render('vision',{title: 'Vision Search',key:gKEY});
    // res.send('hello world');
});

module.exports = router;