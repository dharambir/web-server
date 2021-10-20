const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d7f19a4c536c6104720308b9271667f9&query=' + lat + ',' + long;
    // console.log(url);
    request({ url: url, json: true }, (error, response) => {
        const data = response.body;
        const current = data.current;
        // console.log(data);
        callback(undefined, data);
    })

    // request({ url: url, json: false }, (error, response) => {
    //     // const data = response.body;
    //     // const current = data.current;
    //     // console.log(data);
    //     if (error) {
    //         callback('Unable to search', undefined);
    //     } else {
    //         const data = response.body;
    //         const current = data.current;
    //         callback(undefined, data);

    //     }
    // })
}

module.exports = forecast;