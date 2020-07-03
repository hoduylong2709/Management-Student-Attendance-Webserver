var express = require('express');

var controller = require('../controller/auth.controller');

var router = express.Router();

router.get('/login', controller.login);

router.post('/login', controller.postLogin);

module.exports = router;