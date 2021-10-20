const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZGhhcmFtYmlyNzgiLCJhIjoiY2t1bng5cjkzMjRlaTJvb3o1c3Jpd29qeCJ9.TIvGFfs598_AeL9fa1MEDw&limit=1";
    request({ url: url, json: true }, (error, response) => {
        // console.log('Response ' + JSON.stringify(response.body));
        // console.log(response.body)
        if (error) {
            callback('Unable to search data!', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                locaton: response.body.features[0].place_name
            });
        }
    })
}

module.exports = geocode;