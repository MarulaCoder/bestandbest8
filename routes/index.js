var express = require('express');
var router = express.Router();

// Require our controllers.
var tweetController = require('../controllers/tweetController');
var fileController = require('../controllers/fileController');

// GET home page.
router.get('/', (req, res) => {
    res.render('index', {filename: null, message: null, error: null})
});

router.get('/about', (req, res) => {
    res.render('about', {filename: null, message: null, error: null})
});

router.get('/upload', (req, res) => {
    res.render('upload', {filename: null, message: null, error: null})
});

router.post('/tweet/send', tweetController.sendTweet);

router.get('/tweet/list', tweetController.getAllTweets);

router.get('/tweet/detail', tweetController.getSingleTweet);

router.post('/file/upload', fileController.uploadFile);

module.exports = router;
