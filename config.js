var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
module.exports = function(app) {
    // Set .html as the default template extension
    app.set('view engine', 'html');

    // Initialize the ejs template engine
    app.engine('html', require('ejs').renderFile);

    // Make the files in the public folder available to the world
    app.use(express.static(__dirname + '/public'));
    

    app.use(cookieParser());
    app.use(session({ secret: "MUSICX" }));
    app.use(bodyParser.urlencoded({limit: '20mb', extended: false  }));
    app.use(bodyParser.json());
};