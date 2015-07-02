
// Dependencies

var Promise = require('bluebird');

// Wrap open weather map api with promises

var openWeatherMap = Promise.promisifyAll(require('../services/open-weather-map'));

// Exports

module.exports = function (req, res, next) {

  // Set up view data

  res.locals.cities = [];

  // Use callbacks to do several operations asynchronously
  
  // openWeatherMap.getWeather({
  //   city: 'Springfield',
  //   state: 'IL',
  //   units: 'imperial'
  // }, function (err, weather) {
  //   if (err) { return next(err); }
  //   res.locals.cities.push(weather);


  //   openWeatherMap.getWeather({
  //     city: 'Jacksonville',
  //     state: 'IL',
  //     units: 'imperial'
  //   }, function (err, weather) {
  //     if (err) { return next(err); }
  //     res.locals.cities.push(weather);

  //     openWeatherMap.getWeather({
  //       city: 'Bloomington',
  //       state: 'IL',
  //       units: 'imperial'
  //     }, function (err, weather) {
  //       if (err) { return next(err); }
  //       res.locals.cities.push(weather);

  //       res.render('weather');
  //     });
  //   });
  // });

  // Kick off chain of promises. Notice no callback nesting!
  
  openWeatherMap.getWeatherAsync({
    city: 'Springfield',
    state: 'IL',
    units: 'imperial'
  }).then(function (weather) {
    res.locals.cities.push(weather);

    return openWeatherMap.getWeatherAsync({
      city: 'Jacksonville',
      state: 'IL',
      units: 'imperial'
    });
  }).then(function (weather) {
    res.locals.cities.push(weather);

    return openWeatherMap.getWeatherAsync({
      city: 'Bloomington',
      state: 'IL',
      units: 'imperial'
    });
  }).then(function (weather) {
    res.locals.cities.push(weather);

    res.render('weather');
  }).catch(next);

  // Execute promises in parallel
  
  // Promise.all([
  //   openWeatherMap.getWeatherAsync({ city: 'Springfield', state: 'IL', units: 'imperial' }),
  //   openWeatherMap.getWeatherAsync({ city: 'Jacksonville', state: 'IL', units: 'imperial' }),
  //   openWeatherMap.getWeatherAsync({ city: 'Bloomington', state: 'IL', units: 'imperial' }),
  //   openWeatherMap.getWeatherAsync({ city: 'Chicago', state: 'IL', units: 'imperial' })
  // ]).then(function (results) {
  //   results.forEach(function (city) {
  //     res.locals.cities.push(city);
  //   });

  //   res.render('weather');
  // }).catch(next);

};
