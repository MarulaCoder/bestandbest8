var async = require('async');

var bizOps = require('../bizops/bizops');

const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.sendTweet = (req, res, next) => {
    if(req.body.isOnceOffTweet)
    {
        bizOps.sendSingleTweet(req, res, next);
    }
    if(!req.body.isOnceOffTweet)
    {
        bizOps.sendThreadTweet(req, res, next);
    }
    
}

exports.getAllTweets = (req, res, next) => {
    bizOps.readFile;
}

exports.getSingleTweet = (req, res, next) => {
    bizOps.readFile;
}