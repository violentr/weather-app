const request = require('request');
const yargs = require('yargs');

const argv = yargs
.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true
  }
})
.help()
.alias('help','-h')
.argv

var address = encodeURIComponent(argv.address)
request({
  url: `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
  json: true
}, (error, response, body) => {
  if (error){
    console.log('Could not get response from GOOGLE')
  }else if (body.status === 'ZERO_RESULTS'){
    console.log('Unable to find that address:', address)
  }else if (body.status === 'OK') {
    var body =  body.results[0]
    var location = body.geometry.location
    console.log('Location', body.formatted_address)
    console.log('Latitude', location.lat)
    console.log('Longitude', location.lng)
  }else{
    console.log('Unable to find that address:', address)
  }
});
