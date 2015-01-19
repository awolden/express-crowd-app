'use strict';

var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    crowdMiddleware = require('./lib/crowd-middleware'),
    config = require('./config.js'),
    expressValidator = require('express-validator'),
    session = require('express-session'),
    jadeStatic = require('connect-jade-static');


var routes = require('./routes/index'),
    users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));


/* Session */
app.use(cookieParser());
app.use(session({
    secret: '4G5hG39cX3fnD7igzpe2',
    rolling: true,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 20
    }
}));


/* Crowd Middleware */
app.use(crowdMiddleware(config.crowd));

//pass user info to client
app.use(function (req, res, next) {
    res.locals.user = (req.session.loggedIn) ? req.session.user : null;
    next();
});

/* Use static routes for jade partials */
app.use(jadeStatic({
    baseDir: path.join(__dirname, '/views/partials'),
    baseUrl: '/partials',
    jade: {
        pretty: true
    }
}));

/* Routes */
app.use('/', routes);
app.use('/users', users);
app.use('/auth', require('./routes/authentication'));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;