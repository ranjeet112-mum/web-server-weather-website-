const request = require('postman-request');
const forecast = (lat,lon,callback) => {
    var url=`http://api.weatherstack.com/current?access_key=0c68c217bc8bbdcef6411ffed366faf9&query=${lat},${lon}&units=f`;
    request({url :url , json : true},(err,res) => {
        if(err){
            // console.log('network unavailable!');
            callback('network unavailable!',undefined);
        } else if (res.body.error) {
            // console.log('unable to fetch weather!!');
            callback('unable to fetch weather for that address!!',undefined)
        } else {
            data = {
                weather:res.body.current.weather_descriptions[0],
                actual_temp : res.body.current.temperature,
                feelslike : res.body.current.feelslike
            }
            callback(undefined,data);
            // console.log(`Overall weather is ${}`);
        }
    })

}

module.exports = {
    forecast
}