const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4b6c3c88668857ce1511b355afae77ec&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to forecast service')
        }
        else if (body.success === false && body.error) {
            callback(body.error.info)
        }
        else {
            callback(undefined, {
                temp: body.current.temperature,
                feelsLike: body.current.feelslike,
                weather: body.current.weather_descriptions[0].toLowerCase(),
                icon: body.current.weather_icons[0]
            })
        }
    })
}

module.exports = forecast