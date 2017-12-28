const request = require('request');
var darkSkyApi = process.env.DARK_SKY_API

var getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${darkSkyApi}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error || response.statusCode != 200) {
      callback('Unable to fetch weather information');
    }else{
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
}

module.exports.getWeather = getWeather
