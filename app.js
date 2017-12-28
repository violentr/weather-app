const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(address).then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
  return weather.getWeather(location.latitude, location.longitude)
}).then((weatherResults) => {
  console.log('Current temperature is ', weatherResults.temperature);
  console.log('But it feels like ', weatherResults.apparentTemperature);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

