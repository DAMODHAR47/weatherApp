var request = require("request");

var getWeather = (geocode,callback)=>{
  request({
    url:`https://api.darksky.net/forecast/yourKey/${geocode.Latitude},${geocode.Longitude}` ,
    json:true
  },(error,response,body)=>{
    if(error){
      callback("unable to connect to weatherservers");
    }else if(response.statusCode===400){
      callback("unable to fetch weather data");
    }else if(response.statusCode===200){
      callback(undefined,{
        temperature:body.currently.temperature
      });
    }else{
      callback("unpredicted error in weather fetching");
    }
  });
}

module.exports.getWeather= getWeather;
