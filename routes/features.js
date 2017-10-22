var express = require('express');
var router = express.Router();

/* GET FEATURE PAGE. */
router.get('/', function(req, res, next) {
  res.render('features', { title: 'Features' });
});

module.exports = router;
