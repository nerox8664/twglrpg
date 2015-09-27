import express from 'express';
import User from '../models/user.js';
var router = express.Router();

router.use('/status', function(req, res, next) {
});

module.exports = router;