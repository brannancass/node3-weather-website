const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoiYnJhbm5hbmNhc3MiLCJhIjoiY2trN2c2cDg2MGRtdzJ3cXN5OWgxczlsZCJ9.3XHFCZgBrTEJplSpjLq-8g&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } 
        else if (body.features.length === 0) {
            callback('No matching location found')
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode