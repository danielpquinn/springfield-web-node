
// Dependencies

var home = require('./home');
var weather = require('./weather');

// Exports

module.exports = function (app) {

  // Definitions
  
  app.get('/weather', weather);
  app.get('/', home);
};