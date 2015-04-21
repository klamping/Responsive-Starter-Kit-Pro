/*jshint node:true*/

var open = require('open');
var connect = require('connect');
var serveStatic = require('serve-static');
var url = require('url');

var app = connect();

var ip = process.env.IP || 'localhost';
var port = process.env.PORT || '8080';

var fakeAuth = function(req, res, next) {
  var urlParts = url.parse(req.url, true);
  var query = urlParts.query;

  if (query.secure === 'true') {
    if (req.headers['x-auth-token'] == 'AUTHENTICATE!') {
        next();
    } else {
      res.end('Please authenticate');
    }
  } else {
    next();
  }
};


app.use(fakeAuth);
app.use(serveStatic(__dirname + '/www/'));
app.listen(port, ip);


// Automatically open browser on start
open('http://' + ip + ':' + port);
console.log('Server running at http://' + ip + ':' + port);
