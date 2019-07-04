var yargs = require("yargs");

var geocode= require("./geocode/geocode");
var weather = require("./weather/weather")

var args = yargs
  .options({
    a:{
      demand: true,
      alias:"address",
      description: "type the address you are searching for",
      string: true
    }
  })
  .help()
  .alias("help","h")
  .argv;
// console.log(args);

geocode.geocodeAddress(args.a,(errorMessage, results)=>{
  if(errorMessage){
    console.log(errorMessage);
  }else{
    console.log(JSON.stringify(results,undefined,2));
    weather.getWeather(results, (weatherErrorMessage, weatherResults)=>{
      console.log("------");
      if(weatherErrorMessage){
        console.log(weatherErrorMessage);
      }else{
        console.log(JSON.stringify(weatherResults,undefined,2));
      }
    });
  }
});
