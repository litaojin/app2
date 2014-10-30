var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieSession = require('cookie-session');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var config = require('./config.js');
var Lockit =  require('lockit');
var lockit = new Lockit(config);

var index = require('./routes/index');
var order = require('./routes/order');
var neworder = require('./routes/neworder');
var myaccount =  require('./routes/myaccount');

var api_users = require('./routes/api_users');
var api_orders = require('./routes/api_orders');
var api_dbcmd = require('./routes/api_dbcmd');

var app = express();

app.set('title', '超级洗衣');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieSession({secret: 'TAOTAO'}));
app.use(lockit.router);

app.use('/', index);
app.use('/neworder', neworder);
app.use('/order', order);
app.use('/myaccount', myaccount);

lockit.on('signup', function(user, res){
    console.log('a new user signed up');
});

lockit.on('login', function(user, res){
    console.log('user logined');
});


// RESTFUL API

app.all('/api/*?', function(req, res, next){
    res.contentType('json');
    next();
});

app.use('/api/dbcmd', api_dbcmd);
app.use('/api/users', api_users);
app.use('/api/order', api_orders);


app.get('/test', function(req, res){
    res.render('test', {});
})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.ejs', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.ejs', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
