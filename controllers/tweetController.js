var async = require('async');

var bizOps = require('../bizops/bizops');

const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.sendTweet = (req, res, next) => {
    bizOps.readFile(req, res, next);
}

exports.getAllTweets = (req, res, next) => {
    bizOps.readFile;
}

exports.getSingleTweet = (req, res, next) => {
    bizOps.readFile;
}