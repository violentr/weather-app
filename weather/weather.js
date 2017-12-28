const request = require('request');
var darkSkyApi = process.env.DARK_SKY_API

var getWeather = (lat, lng) => {
  return new Promise((resolve, reject) => {
    request({
      url: `https://api.darksky.net/forecast/${darkSkyApi}/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if (error || response.statusCode != 200) {
        reject('Unable to fetch weather information');
      }else{
        resolve({
          temperature: body.currently.temperature,
          apparentTemperature: body.currently.apparentTemperature
        });
      }
    });
  });
}
module.exports.getWeather = getWeather
