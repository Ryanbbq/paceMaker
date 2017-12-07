var express = require('express');
var router = express.Router();

// globals
var youtubeAPI = process.env.youtubeAPI;

/* Get Features Page */
router.get('/', function(req, res, next) {
  res.render('features', { title: 'Recipe Search', youtubeAPI: youtubeAPI });
});

module.exports = router;