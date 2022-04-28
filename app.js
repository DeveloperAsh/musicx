var app = require('express')();
var http = require('http').Server(app);
var http2 = require('https');
var fs = require('fs');
var gcm = require('node-gcm');
var moment = require('moment');
var mysql = require('mysql');
var port = process.env.PORT || 8044;
var query = new (require('./wrapper/queryWrapper.js'))(mysql);
var request = require('request');
var requestweb = require("request");
const multer = require('multer');
var jwt = require('jsonwebtoken');
var uniqid = require('uniqid');

require('./config')(app);



require('./src/adminPages')(app, query);
require('./src/dashboardWebServices')(app, query, multer, moment, uniqid, fs);


app.get('/music', function (req, res) {
    res.sendfile(__dirname + '/public/media/' + req.query.id);
});


http.listen(port, function () {
    console.log('started at port: ' + port);
});
