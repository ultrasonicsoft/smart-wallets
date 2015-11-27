var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');
var util = require('util');
var dateFormat = require('dateformat');
// var multipart = require('connect-multiparty');
var url = require('url');

var PayU = require('payu');
var merchant_id = "gtKFFx";
var salt = "eCwWELxi";
var payu_url = "https://test.payu.in/?mc_cid=4f8597f9d4&mc_eid=[UNIQID]&mc_cid=f48bb0a3f0&mc_eid=[UNIQID";
var payu = new PayU(merchant_id, salt, payu_url);


var Client = require('node-rest-client').Client;
var client = new Client();

//var multiparty = require('multiparty');

// Start express application
var app = express();

/*MySql connection*/
// var connection = require('express-myconnection'),
// mysql = require('mysql');

//Database connection details
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'root',
//     database: 'smart_wallets'
// });
// connection.query('USE smart_wallets');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.session({ secret: 'securedsession' }));
app.use(passport.initialize()); // Add passport initialization
app.use(passport.session());    // Add passport initialization
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




// app.use(multipart({ uploadDir: __dirname }));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


//==================================================================
// Define the strategy to be used by PassportJS
passport.use(new LocalStrategy(
    function (username, password, done) {

        return done(null, { name: "Balram", isAdmin: "1", userId: "1" });

    }
    ));


// Serialized and deserialized methods when got from session
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// Define a middleware function to be used for every secured routes
var auth = function (req, res, next) {
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};
//==================================================================
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


// route to test if the user is logged in or not
app.get('/loggedin', function (req, res) {
    console.log('checking if user is logged in: ' + req.user);
    res.send(req.isAuthenticated() ? req.user : '0');
});

// route to log in
app.post('/login', passport.authenticate('local'), function (req, res) {
    res.send(req.user);
});

// route to log out
app.post('/logout', function (req, res) {
    req.logOut();
    res.send(200);
});

//==================================================================
// routes
app.get('/', function (req, res) {
    res.render('index');
});

app.get('/getAllDocuments', auth, function (req, res) {
    // executeSqlRequest(req, res, 'call getAllDocuments();');
});

app.post('/updateUser', auth, function (req, res) {

    //     var query = util.format('call updateUser(%d,\'%s\',\'%s\',%d);',
    //         req.body.user.id, req.body.user.userName, req.body.user.password, req.body.user.isAdmin);
    // 
    //     console.log(query);
    //     connection.query(query, function (err, rows) {
    //         if (err) {
    //             console.log(err);
    //             res.send(400);
    //         }
    //         res.send(200);
    //     });
});


function executeSqlRequest(req, res, query) {
    // connection.query(query, function (err, rows) {
    //     //  console.log(rows);
    //     
    //     if (err) // error connecting to database
    //         console.log(err);
    //     if (rows.length) { // user exists
    //         res.send(rows);
    //     }
    // });
}

// createPayUPaymentRequest();
// 
// function createPayUPaymentRequest() {
// 
//     var paymentData = {
//         amount: 10.00,
//         firstname: "amit",
//         email: "amitpatel049@gmail.com",
//         productinfo: "test",
//         surl: "http://localhost:3000/",
//         furl: "http://localhost:3000/",
//         phone: "7893047541",
//         key: "C0Dr8m",
//         txnid: "ffb0467973000a505ea9",
//         hash: "b902d7b93c64511cffd07b9130e9b53c62eae04af61d2ca983844165084b4712a242d7a3bd033fca753a8a65b07ef11dcb9cae9e2bb7ffdb7fe6efffe3c41425",
//     };
//     
//     // args = {
//     //     parameters: { arg1: "hello", arg2: "world" },
//     //     data: "<xml><arg1>hello</arg1><arg2>world</arg2></xml>"
//     // };
// 
//     client.post("https://test.payu.in/_payment", paymentData, function (data, response) {
//         // parsed response body as js object 
//         console.log(data);
//         // raw response 
//         console.log(response);
//     });
// }

