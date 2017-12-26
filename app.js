const request = require('request');
var address = ''
request({
  url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (error, response, body) => {
  var body =  body.results[0]
  var location = body.geometry.location
  console.log('Location', body.formatted_address)
  console.log('Latitude', location.lat)
  console.log('Longitude', location.lng)
});
