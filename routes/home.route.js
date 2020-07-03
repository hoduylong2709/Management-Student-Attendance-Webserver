var express = require('express');

var controller = require('../controller/home.controller');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get('/', controller.home);

router.get('/teachDay', controller.teachDay);

router.post('/', controller.indexPost1);

router.post('/delete', controller.indexPost);

module.exports = router;