
// Dependencies

var expect = require('chai').expect;
var nock = require('nock');

var openWeatherMap = require('../services/open-weather-map');
 
var mocks = nock('http://api.openweathermap.org/data/2.5')
  .get('/weather?q=Springfield,IL&units=imperial')
  .reply(200, require('./fixtures/open-weather-map-springfield.json'));

// Open weather map service test

describe('OpenWeatherMap', function () {

  describe('#getWeather', function () {
    it('should return the current weather for Springfield, IL', function (done) {
      openWeatherMap.getWeather({
        city: 'Springfield',
        state: 'IL'
      }, function (err, weather) {
        expect(weather).to.deep.equal({
          name: 'Springfield, IL',
          temperature: 72.81,
          description: 'scattered clouds'
        });
        done();
      });
    });
  });
});