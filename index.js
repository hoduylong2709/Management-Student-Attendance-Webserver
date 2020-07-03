require("dotenv").config();
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route');
var homeRoute = require('./routes/home.route');

var authMiddleware = require('./middlewares/auth.middleware');

var port = 4000;

var app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.use('/users', authMiddleware.requireAuth, userRoute);
app.use('/home', authMiddleware.requireAuth, homeRoute);
app.use('/auth', authRoute);

app.listen(port, function() {
    console.log('Server listening on port ' + port);
});