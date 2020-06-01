var async = require('async');

var bizOps = require('../bizops/bizops');

const { body, validationResult } = require('express-validator');
const { sanitizeBody } = require('express-validator');

exports.uploadFile = (req, res, next) => {
    bizOps.uploadFile(req, res, next);
}