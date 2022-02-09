const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWl0dHktZnJvc3QiLCJhIjoiY2t5eXF6MzFwMDBxZzJ4bWlzNHBoNmJ0MCJ9.lcDHcl9lRgDBv1j7M2BvxQ`;
    
    // body is destructuring of reponse.body
    // request({url, json: true}, (error, response) => {
        request({url, json: true}, (error, {body}) => {
        if (error){
            // console.log('Unable to connect to location services.');
            callback('Unable to connect to location services!', undefined);
        }else if(body.features.length === 0){
            // console.log('Unable to find location.');
            callback('Unable to find location. Try another search.', undefined);
        }else{
            const  geo_loc = body.features[0].center;
            //console.log(geo_center[0]);
            const latitude = geo_loc[1];
            const longitude = geo_loc[0];
            const location = body.features[0].place_name;
            
            callback(undefined, {
                // latitude: latitude,
                // longitude: longitude,
                // location: response.body.features[0].place_name
                latitude,
                longitude,
                location
            });
        }
    });
}

module.exports = geocode;
