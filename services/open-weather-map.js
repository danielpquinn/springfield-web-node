
// Dependencies

var extend = require('util')._extend;
var Promise = require('bluebird');

var request = Promise.promisifyAll(require('request'));

// Constructor

function OpenWeatherMap() {}

// Static properties

OpenWeatherMap.baseUrl = 'http://api.openweathermap.org/data/2.5/';

// Get weather for city and state using callback pattern

OpenWeatherMap.prototype.getWeather = function (options, cb) {
  var defaults = {
    city: '',
    state: '',
    units: 'imperial'
  };

  var options = extend(defaults, options);

  var url = OpenWeatherMap.baseUrl + 'weather?q=' + options.city + ',' + options.state + '&units=' + options.units;

  // Send request

  request.getAsync({
    url: url,
    json: true
  }).then(function (result) {
    var response = result[0];
    var body = result[1];

    // If result was not a 200, pass error back to caller

    if (response.statusCode !== 200) { return cb(new Error(body.message)); }

    // Pass data back to caller

    cb(null, {
      name: options.city + ', ' + options.state,
      temperature: body.main.temp,
      description: body.weather[0].description
    });
  })
  .catch(cb);

};

// Exports

module.exports = new OpenWeatherMap();