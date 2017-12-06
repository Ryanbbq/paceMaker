var express = require('express');
var router = express.Router();

var gKEY = process.env.googleVisionKEY;
/*
router.post('/login', function(req, res, next) {
    var username = req.body.params.name;
    res.json({'status': 200, 'msg': 'success'});
});*/       

/* Get Vision Page */
router.get('/', function(req,res,next){
    res.render('vision',{title: 'Vision Search',key:gKEY});
    // res.send('hello world');
});

module.exports = router;