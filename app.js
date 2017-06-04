var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var Connection = require('tedious').Connection;
var bodyParser = require('body-parser');
var http = require('http');         // protocol
var DButilsAzure = require('./utils');
var Constants = require('./Constants');
var users = require('./routes/Users');
var cakes = require('./routes/Cakes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.logger('dev')); // This line is what turns on the server logger in the terminal.

/*
// catch 404 and forward to error handle
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});*/

//The following is what sets the port of your local app, feel free to change that if needed.
app.use('/users', users);
app.use('/cakes', cakes);
app.set('port', process.env.PORT || 3000);
app.listen(3000, function() {
    console.log('I am listening on localhost:3000');
    // server is open and listening on port 3000, to access: localhost:3000 in any browser.
});
//-------------------------------------------------------------------------------------------------------------------
/*app.use(function(req, res, next){
    if (connected)
        next();
    else
        res.status(503).send('Server is down');
});*/
//-------------------------------------------------------------------------------------------------------------------
app.get('/getDollarRate', function (req,res) {
        res.send("3.81");
});
//-------------------------------------------------------------------------------------------------------------------
app.get('/categories', function (req,res) {
    DButilsAzure.Select("Select * from Categories").then(function (result) {
            res.send(result);
    });
});
//-------------------------------------------------------------------------------------------------------------------


// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
