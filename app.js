var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var cookieSession = require('cookie-session');
var expressjwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var index = require('./routes/index');
var order = require('./routes/order');
var neworder = require('./routes/neworder');
var myaccount =  require('./routes/myaccount');

var api_users = require('./routes/api_users');
var api_orders = require('./routes/api_orders');
var api_dbcmd = require('./routes/api_dbcmd');

var authenticate =  require('./routes/authenticate');
var signup =  require('./routes/signup');
var api_v1_users = require('./routes/api_v1_users');
var api_v1_orders = require('./routes/api_v1_orders');
var api_v1_dbcmd = require('./routes/api_v1_dbcmds');

var app = express();

app.set('title', '超级洗衣');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var secret = 'this is Taos secret secret';
// uncomment after placing your favicon in /public
app.use('/api/v1', expressjwt({secret: secret}));

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/neworder', neworder);
app.use('/order', order);
app.use('/myaccount', myaccount);

app.use('/authenticate', authenticate);
app.use('/signup', signup);


// RESTFUL API

app.all('/api/*?', function(req, res, next){
    res.contentType('json');
    next();
});

app.use('/api/dbcmd', api_dbcmd);
app.use('/api/users', api_users);
app.use('/api/order', api_orders);


app.use('/api/v1/dbcmd', api_v1_dbcmd);
app.use('/api/v1/users', api_v1_users);
app.use('/api/v1/orders', api_v1_orders);


app.get('/test', function(req, res){
    res.render('test', {});
})

app.use(function(err, req, res, next){
   if(err.constructor.name === 'UnauthorizedError'){
       res.status(401).send('Unauthorized');
   }
});

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
