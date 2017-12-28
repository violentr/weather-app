const request = require('request');
var darkSkyApi = process.env.DARK_SKY_API

var getWeather = (lat, lng) => {
  request({
    url: `https://api.darksky.net/forecast/${darkSkyApi}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      console.log(`Current temperature is: ${body.currently.temperature}`)
    }else{
      console.log('Unable to fetch weather information')
    }
  })
}

module.exports.getWeather = getWeather
