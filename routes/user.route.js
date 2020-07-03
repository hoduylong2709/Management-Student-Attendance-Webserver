var express = require('express');

var controller = require('../controller/user.controller');
var authMiddleware = require('../middlewares/auth.middleware');

var router = express.Router();

router.get("/logout", controller.logout); 

router.get("/home", controller.home);

router.get('/listStudent', controller.list);

router.get('/:date', controller.index);

router.post('/', controller.indexPost);

router.post('/delete', controller.indexPost1);

router.post('/edit', controller.indexPost2);

router.post('/dateSelect', controller.indexPost3);

module.exports = router;