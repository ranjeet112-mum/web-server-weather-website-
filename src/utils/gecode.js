const request = require('postman-request');


const geoCode = (address, callback) => {

    var url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicmFuaml0dHR0dCIsImEiOiJja2g3aWR4dGowOHVtMzBsbGl6d3pwYWJ5In0.slVpbEJIHo5WBwUEParWPQ&limit=1`;
    if(address === '') return callback('network unavailable',undefined);
    request({ url : url , json : true } , (err ,res ) => {
        if(err) {
            callback('network unavailable',undefined);
        } else if(res.body.features.length === 0) {
            callback('unable to find a location with that address',undefined);
        } else {
            callback(undefined, {
                lat : res.body.features[0].center[0],
                lon : res.body.features[0].center[1],
                location : res.body.features[0].place_name
            })
        }

    })
}

module.exports = {
    geoCode
}