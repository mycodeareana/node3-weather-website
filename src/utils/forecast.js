const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=6df4d4cd491050568fd1a0616acb31f9&query=${latitude},${longitude}`;
    //&units=c
        
    // request({url, json: true}, (error, response) => {
    request({url, json: true}, (error, {body}) => {
        if (error){
            // console.log(('Unable to connect to weather services.'))
            callback('Unable to connect to weather services!', undefined);
        }else if(body.error){
            // console.log(('Unable to find location.'))
            callback('Unable to find location!', undefined);
        }else{
            // console.log(response.body.current.weather_descriptions[0]+ `. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`);
            const weather_descriptions = body.current.weather_descriptions[0];
            const temperature = body.current.temperature;
            const feelslike = body.current.feelslike;
            const humidity = body.current.humidity;
            const msg = body.current.weather_descriptions[0]+ `. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out. The humidity is ${humidity}%.`;
            
           
            // callback(undefined, {
            //     weather_descriptions: response.body.current.weather_descriptions[0],
            //     temperature: response.body.current.temperature,
            //     feelslike: response.body.current.feelslike,
            //     msg: response.body.current.weather_descriptions[0]+ `. It is currently ${response.body.current.temperature} degrees out. It feels like ${response.body.current.feelslike} degrees out.`
            // });
            callback(undefined, {
                weather_descriptions,
                temperature,
                feelslike,
                msg
            });

            // callback(undefined, msg);
        }
        
    });

};

module.exports = forecast;