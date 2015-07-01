
// Dependencies

var express = require('express');
var routes = require('./routes');

// Create a new Express app

var app = express();

// Configure app

app.set('views', './views');
app.set('view engine', 'jade');

// Define routes

routes(app);

// Run application

var server = app.listen(3000, function () {
  var address = server.address();

  console.log(server.address);

  console.log('App running at http://%s:%s', address.host, address.port);
});