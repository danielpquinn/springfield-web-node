
// Dependencies

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

// Exports

module.exports = function (req, res, next) {

  // Fetch data from open weather map api using promises

  var addCityAsync = function (city, state) {

    return request.getAsync({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&units=imperial',
      json: true
    })
    .then(function (response) {
      var body = response[1];

      // If result was not a 200, pass error back to caller
      
      if (body.cod !== 200) { throw new Error(body.message); }

      // Add relevant response data to view
      
      res.locals.cities.push({
        name: city + ', ' + state,
        temperature: body.main.temp,
        description: body.weather[0].description
      });
    });
  };

  // Fetch data from open weather map api using callbacks

  var addCity = function (city, state, cb) {

    request.get({
      url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + state + '&units=imperial',
      json: true
    }, function (err, response, body) {

      // Allow caller to handle error

      if (err) { return cb(err); }

      // If result was not a 200, pass error back to caller
      
      if (response.cod !== 200) { return cb(new Error(body.message)); }

      // Add relevant response data to view
      
      res.locals.cities.push({
        name: city + ', ' + state,
        temperature: body.main.temp,
        description: body.weather[0].description
      });

      // Pass data back to caller

      cb();
    });

  };

  // Set up view data

  res.locals.cities = [];

  // Use callbacks to do several things asynchronously

  // addCity('Springfield', 'IL', function (err) {
  //   if (err) { return next(err); }

  //   addCity('Jacksonville', 'IL', function (err) {
  //     if (err) { return next(err); }

  //     addCity('Helena', 'MT', function (err) {
  //       if (err) { return next(err); }

  //       addCity('New York', 'NY', function (err) {
  //         if (err) { return next(err); }

  //         res.render('weather');
  //       });
  //     });
  //   });
  // });

  // Kick off chain of promises. Notice no callback nesting!

  addCityAsync('Springfield', 'IL')
    .then(function () {
      return addCityAsync('Jacksonville', 'IL');
    })
    .then(function () {
      return addCityAsync('Helena', 'MT');
    })
    .then(function () {
      return addCityAsync('New York', 'NY');
    })
    .then(function () {
      res.render('weather');
    })
    .catch(next);
};