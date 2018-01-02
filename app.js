const yargs = require('yargs');

const axios = require('axios');
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
var darkSkyApi = process.env.DARK_SKY_API

var url = `http://maps.googleapis.com/maps/api/geocode/json?address=${address}`
axios.get(url).then((response) => {
  if (response.data.status == "ZERO_RESULTS") {
    throw new Error('Unable to find that address');
  }
  var lat = response.data.results[0].geometry.location.lat
  var lng = response.data.results[0].geometry.location.lng
  var url =  `https://api.darksky.net/forecast/${darkSkyApi}/${lat},${lng}`

  console.log(`Address: ${response.data.results[0].formatted_address}`)
  return axios.get(url)
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  console.log('Current temperature is: ', temperature);
  console.log('But it feels like: ', apparentTemperature);
}).catch((errorMessage) => {
  if (errorMessage.code == 'ENOTFOUND') {
    console.log('Unable to connect to API servers');
  }else {
    console.log(errorMessage.message);
  }
});

