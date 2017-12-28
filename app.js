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

geocode.geocodeAddress(address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  }else {
    console.log('Results', results);
    weather.getWeather(results.latitude, results.longitude)
  }
});
