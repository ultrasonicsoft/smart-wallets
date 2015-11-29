var express = require('express');
var http = require('http');
var path = require('path');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var js2xmlparser = require("js2xmlparser");
var fs = require('fs');
var util = require('util');
var dateFormat = require('dateformat');
var multipart = require('connect-multiparty');
var url = require('url');
var request = require('request');
var crypto = require('crypto');
// 
// var PayU = require('payu');
// var merchant_id = "gtKFFx";
// var salt = "eCwWELxi";
// var payu_url = "https://test.payu.in/?mc_cid=4f8597f9d4&mc_eid=[UNIQID]&mc_cid=f48bb0a3f0&mc_eid=[UNIQID";
// var payu = new PayU(merchant_id, salt, payu_url);


// var Client = require('node-rest-client').Client;
// var client = new Client();

var multiparty = require('multiparty');

// Start express application
var app = express();

/*MySql connection*/
var connection = require('express-myconnection'),
    mysql = require('mysql');


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'smart_wallets'
});
connection.query('USE smart_wallets');

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

        var query = "SELECT * FROM users where username = '" + username + "' and password = '" + password + "'";

        connection.query(query, function (err, rows) {
            if (err)
                console.log(err);
            if (!rows.length) {  
                //return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash  
                return done(null, false, { message: 'No user found.' });
            }  
             
            // if the user is found but the password is wrong  
            if (!(rows[0].password == password))  
                //return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata  
                return done(null, false, { message: 'Oops! Wrong password.' });  
              
            // all is well, return successful user  
              
            //return done(null, rows[0]);  
            var userDetails = rows[0];
            return done(null, { name: userDetails.username, isAdmin: userDetails.isAdmin, userId: userDetails.id });

        });  
          
        //if (username === "admin" && password === "admin") // stupid example  
        //    return done(null, { name: "admin" });  
          
        //return done(null, false, { message: 'Incorrect username.' });  
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

app.get('/getAllPaymentServices/:merchantId', auth, function (req, res) {
    // var queryData = url.parse(req.url, true).query;

    console.log('Merchant Id: ' + req.params.merchantId);
    executeSqlRequest(req, res, 'call getAllPaymentServices('+ req.params.merchantId + ');');
});

app.get('/getMerchantId/:userId', auth, function (req, res) {
    // var queryData = url.parse(req.url, true).query;

    console.log('UserId Id: ' + req.params.userId);
    var query = 'SELECT * FROM smart_wallets.merchant where userid = ' + req.params.userId;
    executeSqlRequest(req, res,  query);
});


app.get('/getTransactionIdAndHash', auth, function (req, res) {
    //sha512(key|txnid|amount|productinfo|firstname|email|||||||||||SALT)
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

    var txnid = "11/28/2015 2:03:36 PM";
    var amount = 10.0;
    var email = "balramchavan@gmail.com";
    var productInfo = 'test';
    var phone = "8237602116";
    var key = "C0Dr8m";
    var firstName = "balram";
    
    // var key = "C0Dr8m";
    // // var key = "gtKFFx";
    // var txnid = "11/28/2015 2:03:20 PM";
    // var amount = 10.00;
    // var productinfo = "test";
    // var firstname = "balram";
    // var email = "balramchavan@gmail.com";
    var SALT = "3sf0jURk";
    // var SALT = "eCwWELxi";
    var s = crypto.createHash('sha512');
    s.update([key, txnid, amount, productInfo, firstName, email, null, null, null, null, null, null, null, null, null, null, SALT].join('|'));
    var hash = s.digest('hex');
    console.log('Hash value: ' + hash);
    res.send(hash);
});

app.post('/postDataToGetHash', auth, function (req, res) {
    var paymentData = req.body.paymentData;
    console.log(paymentData);

    var SALT = "3sf0jURk";
    // var SALT = "eCwWELxi";
    var s = crypto.createHash('sha512');
    s.update([paymentData.key, paymentData.transactionId, paymentData.amount, paymentData.productInfo, paymentData.firstName, paymentData.email, 
    null, null, null, null, null, null, null, null, null, null, SALT].join('|'));
    var hash = s.digest('hex');
    console.log('Hash value: ' + hash);
    res.send(hash);
});

app.post('/paymentResult', auth, function (req, res) {
    console.log('response received from payU');
    console.log(req);

    res.send(200);
});

app.post('/', auth, function (req, res) {
    console.log('response received from payU on /');
    console.log(req);
    var responseHtml = '<h2>Transaction Status: ' + req.body.status + ' </h2>';
    responseHtml += '<h3>Transaction ID: ' + req.body.mihpayid + ' </h3>';
    res.send(responseHtml);
});

function executeSqlRequest(req, res, query) {
    connection.query(query, function (err, rows) {

        if (err) // error connecting to database
            console.log(err);
        if (rows.length) { // user exists
            res.send(rows);
        }
    });
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

