const request = require('request');

var geocodeAddress = (address, callback) => {
  request({
    url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
    json: true
  }, (error, response, body) => {
    if (error){
      callback('Could not get response from GOOGLE')
    }else if (body.status === 'ZERO_RESULTS'){
      callback(`Unable to find that address: ${address}`)
    }else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }else {
      callback('Too many requests to Google server was made \n try again later')
    }
  });
}

module.exports = {
  geocodeAddress
}
