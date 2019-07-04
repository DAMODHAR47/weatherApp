var request = require("request");

var geocodeAddress= (address,callback)=>{
  var encodedAddress = encodeURIComponent(address);

  request({
    url:`http://www.mapquestapi.com/geocoding/v1/address?key=KeyValue=${encodedAddress}`,
    // type:"json"
    json:true
  },(error,response,body)=>{
    // console.log(JSON.stringify(body, undefined, 2));
    // stringObj = JSON.parse(JSON.stringify(body));
    // console.log("status:",stringObj.status);
    // console.log(stringObj);
    if(error){
      callback("unable to connect to google servers");
    }else if(body.info.statuscode==="ZERO_RESULTS"){
      callback("invalid address.please enter a valid address");
    }else if(body.info.statuscode===0){
      callback(undefined,{
        formatted_Address:body.results[0].locations[0].adminArea5,
        Latitude: body.results[0].locations[0].latLng.lat,
        Longitude: body.results[0].locations[0].latLng.lng
      });
      // console.log(`formatted Address:${body.results[0].formatted_address}`);
      // console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      // console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }else{
      callback("unpredicted error in geocode fetching");
    }
  });
}

module.exports={
  geocodeAddress,
};
